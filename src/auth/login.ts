import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { Autenticaveis } from './authEntity.js'

import { AppDataSource } from '../data-source.js'
import { AppError } from '../error/ErrorHandler.js'
import { decryptPassword } from '../utils/senhaUtils.js'

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body

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

    const payload = { id, role }
    const accessToken = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: '15m'
    }) // expira em 15 minutos

    res.set('Authorization', accessToken)
    res.status(200).json({
      auth: true,
      accessToken,
      // refreshToken,
      rota
    })
  }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ auth: false, token: null })
}
