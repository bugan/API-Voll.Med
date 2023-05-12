import { request, type Request, type Response } from 'express'
import { Autenticaveis } from './authEntity.js'
import { access, refresh } from './tokens.js'

import { AppDataSource } from '../data-source.js'
import { AppError } from '../error/ErrorHandler.js'
import { decryptPassword } from '../utils/senhaUtils.js'

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, senha } = req.body

  if (req.userId) {
    const autenticavel = await AppDataSource.manager.findOne(Autenticaveis, {
      select: ['id', 'role', 'rota'],
      where: { id: req.userId }
    })

    if (autenticavel == null) {
      throw new AppError('Não encontrado!', 404)
    }

    const newAccessToken = access.cria(req.userId, autenticavel.role)
    const newRefreshToken = await refresh.cria(req.userId)
    return res.status(200).json({
      auth: true,
      newAccessToken,
      newRefreshToken,
      rota: autenticavel.rota
    })
  }

  const autenticavel = await AppDataSource.manager.findOne(Autenticaveis, {
    select: ['id', 'rota', 'role', 'senha'],
    where: { email }
  })

  if (autenticavel == null) {
    throw new AppError('Não encontrado!', 404)
  } else {
    const { id, rota, role, senha: senhaAuth } = autenticavel
    const senhaCorrespondente = decryptPassword(senhaAuth)

    if (senha !== senhaCorrespondente) {
      throw new AppError('Senha incorreta!', 401)
    }

    // aqui passo o role pq vai pro payload
    const accessToken = access.cria(id, role)
    const refreshToken = await refresh.cria(id)

    return res.status(200).json({
      auth: true,
      accessToken,
      refreshToken,
      rota
    })
  }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token != null) {
    await access.invalida(token)
  }
  res.status(204).json({ auth: false, token: null, message: 'Logout realizado com sucesso!' })
}
