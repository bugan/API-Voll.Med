import { Router } from 'express'
import {
  pacientes,
  pacientePost,
  pacienteGet,
  pacienteUpdate,
  desativaPaciente
} from './pacienteController.js'

export const pacienteRouter = Router()

pacienteRouter.get('/', pacientes)
pacienteRouter.post('/', pacientePost)
pacienteRouter.get('/:id', pacienteGet)
pacienteRouter.put('/:id', pacienteUpdate)
pacienteRouter.delete('/:id', desativaPaciente)

export default (app) => {
  app.use('/paciente', pacienteRouter)
}
