import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { Autenticaveis } from './authEntity.js'

import { AppDataSource } from '../data-source.js'

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body
  const autenticavel = await AppDataSource.manager.findOne(Autenticaveis, {
    select: ['id', 'rota', 'role'],
    where: { email, senha }
  })

  if (autenticavel == null) {
    res.status(500).json({ message: 'Login inválido!' })
  } else {
    const { id, rota, role } = autenticavel

    const token = jwt.sign({ id, role }, process.env.SECRET, {
      expiresIn: 86400
    }) // expira em 24 horas

    res.status(200).json({
      auth: true,
      token,
      rota
    })
  }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ auth: false, token: null })
}
