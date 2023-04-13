/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { verificaTokenJWT } from './verificaTokenJWT.js'
import { login, logout } from './login.js'

export const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/logout', verificaTokenJWT(), logout)

export default (app: any): void => {
  app.use('/auth', authRouter)
}
