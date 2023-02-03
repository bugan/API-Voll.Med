import { Router } from 'express'

import {
    pacientes,
    pacientePost,
    pacienteGet,
    pacienteUpdate,
    pacienteDelete,
} from '../controllers/pacienteController.js'

export const pacienteRouter = Router()

pacienteRouter.get('/pacientes', pacientes)
pacienteRouter.post('/paciente', pacientePost)
pacienteRouter.get('/paciente/:id', pacienteGet)
pacienteRouter.put('/paciente/:id', pacienteUpdate)
pacienteRouter.delete('/paciente/:id', pacienteDelete)