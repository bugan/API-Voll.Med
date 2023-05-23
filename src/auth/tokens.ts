/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import moment from 'moment'
import { AppError, Status } from '../error/ErrorHandler.js'

import ClienteRedis from '../services/redis/redisClient.js'

const TEMPO_EXPIRACAO_ACCESS_TOKEN = [20, 'm']
const TEMPO_EXPIRACAO_REFRESH_TOKEN = [5, 'd']

const allowlistRefreshToken = new ClienteRedis('allowlist-refresh-token: ')
const blocklistAccessToken = new ClienteRedis('blocklist-access-token: ')

function criaTokenJWT (id, role, [tempoQuantidade, tempoUnidade]: string[]): string {
  const payload = { id, role }
  const token = jwt.sign(payload, process.env.SECRET_JWT, {
    expiresIn: tempoQuantidade + tempoUnidade
  })
  return token
}

async function verificaTokenNaBlocklist (token, nome: string, blocklist): Promise<void> {
  const tokenNaBlocklist = await blocklist.contemChave(token)
  if (tokenNaBlocklist) {
    throw new AppError(`${nome} inválido!`, Status.UNAUTHORIZED)
  }
}

async function invalidaTokenJWT (token, blocklist): Promise<void> {
  return blocklist.adiciona(token)
}

async function criaTokenOpaco (id, [tempoQuantidade, tempoUnidade], allowlist): Promise<string> {
  const tokenOpaco = crypto.randomBytes(24).toString('hex')
  const dataExpiracao = moment().add(tempoQuantidade, tempoUnidade).unix()
  await allowlist.adiciona(tokenOpaco, id, dataExpiracao)
  return tokenOpaco
}

async function verificaTokenOpaco (token, nome, allowlist): Promise<string> {
  verificaTokenEnviado(token, nome)
  const id = await allowlist.buscaValor(token)

  verificaTokenValido(id, nome)
  return id
}

async function invalidaTokenOpaco (token, allowlist): Promise<void> {
  await allowlist.deleta(token)
}

function verificaTokenValido (id, nome: string): void {
  if (!id) {
    throw new AppError(`${nome} inválido! Faça login novamente`, Status.UNAUTHORIZED)
  }
}

function verificaTokenEnviado (token, nome: string): void {
  if (!token) {
    throw new AppError(`${nome} não enviado!`, Status.UNAUTHORIZED)
  }
}

export const access = {
  nome: 'access token',
  lista: blocklistAccessToken,
  expiracao: TEMPO_EXPIRACAO_ACCESS_TOKEN,
  cria (id, role) {
    return criaTokenJWT(id, role, this.expiracao)
  },
  async verifica (token) {
    await verificaTokenNaBlocklist(token, this.nome, this.lista)
  },
  async invalida (token) {
    await invalidaTokenJWT(token, this.lista)
  }
}

export const refresh = {
  nome: 'refresh token',
  lista: allowlistRefreshToken,
  expiracao: TEMPO_EXPIRACAO_REFRESH_TOKEN,
  async cria (id) {
    return await criaTokenOpaco(id, this.expiracao, this.lista)
  },
  async verifica (token) {
    return await verificaTokenOpaco(token, this.nome, this.lista)
  },
  async invalida (token) {
    await invalidaTokenOpaco(token, this.lista)
  }
}
