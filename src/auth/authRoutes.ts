/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { verificaTokenJWT, refreshMiddleware } from './middlewares/authMiddlewares.js'
import { login, logout } from './login.js'

export const authRouter = Router()

authRouter.post('/refresh', await refreshMiddleware(), login)
authRouter.post('/login', login)
authRouter.post('/logout', await refreshMiddleware(), verificaTokenJWT(), logout)

export default (app: any): void => {
  app.use('/auth', authRouter)
}
