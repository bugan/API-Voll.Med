/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { buscaConsultaPorId, criaConsulta, deletaConsulta, listaConsultas } from './consultaController.js'
import errorMiddleware from '../error/errorMiddleware.js'

export const consultaRouter = Router()
consultaRouter.post('/', criaConsulta)
consultaRouter.get('/', listaConsultas)
consultaRouter.get('/:id', buscaConsultaPorId)
consultaRouter.delete('/:id', deletaConsulta)

export default (app) => {
  app.use('/consulta', consultaRouter)
}
