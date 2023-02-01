import { Router } from 'express'

import {
    pacientes,
    pacientePost,
    pacienteGet,
    pacienteDelete,
} from '../controllers/pacienteController.js'

export const pacienteRouter = Router()

pacienteRouter.get('/pacientes', pacientes)
pacienteRouter.post('/paciente', pacientePost)
pacienteRouter.get('/paciente/:id', pacienteGet)
pacienteRouter.delete('/paciente/:id', pacienteDelete)