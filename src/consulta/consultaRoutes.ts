/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { criaConsulta } from './consultaController'

export const consultaRouter = Router()

consultaRouter.post('/', criaConsulta)

export default (app) => {
  app.use('/consulta', consultaRouter)
}
