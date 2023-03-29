/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { resolver } from '../apiError/ErrorHandler.js'

import {
  listarClinicas,
  criarClinica,
  buscarClinica,
  atualizarClinica,
  deletarClinica,
  listaEspecialistasPorClinica,
  atualizaEspecialistaPeloIdDaClinica
} from './clinicaController.js'

export const clinicaRouter = Router()

clinicaRouter.get('/', resolver(listarClinicas))
clinicaRouter.post('/', resolver(criarClinica))
clinicaRouter.get('/:id', resolver(buscarClinica))
clinicaRouter.put('/:id', resolver(atualizarClinica))
clinicaRouter.delete('/:id', resolver(deletarClinica))

clinicaRouter.post('/:id/especialista', resolver(atualizaEspecialistaPeloIdDaClinica))

// listar todos os especialistas de uma clinica especificada pelo id
clinicaRouter.get('/:id/especialista', resolver(listaEspecialistasPorClinica))

export default (app) => {
  app.use('/clinica', clinicaRouter)
}
