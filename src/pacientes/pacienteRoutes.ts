/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import {
  lerPacientes,
  criarPaciente,
  lerPaciente,
  atualizarPaciente,
  deletarPaciente,
  atualizarEnderecoPaciente,
} from './pacienteController.js'

export const pacienteRouter = Router()

pacienteRouter.get('/', lerPacientes)
pacienteRouter.post('/', criarPaciente)
pacienteRouter.get('/:id', lerPaciente)
pacienteRouter.put('/:id', atualizarPaciente)
pacienteRouter.delete('/:id', deletarPaciente)
pacienteRouter.patch('/:id', atualizarEnderecoPaciente)

export default (app) => {
  app.use('/paciente', pacienteRouter)
}
