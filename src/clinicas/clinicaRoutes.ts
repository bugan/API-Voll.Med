/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import {
  listarClinicas,
  criarClinica,
  buscarClinica,
  atualizarClinica,
  deletarClinica
} from './clinicaController.js'

export const clinicaRouter = Router()

clinicaRouter.get('/', listarClinicas)
clinicaRouter.post('/', criarClinica)
clinicaRouter.get('/:id', buscarClinica)
clinicaRouter.put('/:id', atualizarClinica)
clinicaRouter.delete('/:id', deletarClinica)

export default (app) => {
  app.use('/clinica', clinicaRouter)
}
