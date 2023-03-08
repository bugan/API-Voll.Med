/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { criaConsulta,listaConsultas,buscaConsultaPorId,deletaConsulta } from './consultaController.js'
import {resolver } from '../apiError/ErrorHandler.js'

export const consultaRouter = Router()

consultaRouter.post('/', resolver(criaConsulta))
consultaRouter.get('/', resolver(listaConsultas))
consultaRouter.get('/:id', resolver(buscaConsultaPorId))
consultaRouter.delete('/:id', resolver(deletaConsulta))

export default (app) => {
  app.use('/consulta', consultaRouter)
}
