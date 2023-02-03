/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import {
  pacientes,
  pacientePost,
  pacienteGet,
  pacienteUpdate,
  pacienteDelete
} from '../controllers/pacienteController.js'

export const pacienteRouter = Router()

pacienteRouter.get('/pacientes', pacientes)
pacienteRouter.post('/', pacientePost)
pacienteRouter.get('/:id', pacienteGet)
pacienteRouter.put('/:id', pacienteUpdate)
pacienteRouter.delete('/:id', pacienteDelete)
