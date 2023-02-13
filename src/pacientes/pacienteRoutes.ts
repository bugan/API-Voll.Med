/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import {
  pacientes,
  pacientePost,
  pacienteGet,
  pacienteUpdate,
  pacienteDelete,
  pacienteEnderecoPatch,
} from './pacienteController.js'

export const pacienteRouter = Router()

pacienteRouter.get('/', pacientes)
pacienteRouter.post('/', pacientePost)
pacienteRouter.get('/:id', pacienteGet)
pacienteRouter.put('/:id', pacienteUpdate)
pacienteRouter.delete('/:id', pacienteDelete)
pacienteRouter.patch('/:id', pacienteEnderecoPatch)

export default (app)=> {
  app.use('/paciente', pacienteRouter)
}