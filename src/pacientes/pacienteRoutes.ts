import { Router } from 'express'
import { verificaTokenJWT } from '../auth/verificaTokenJWT.js'
import { resolver } from '../apiError/ErrorHandler.js'
import {
  lerPacientes,
  criarPaciente,
  lerPaciente,
  atualizarPaciente,
  desativaPaciente,
  atualizarEnderecoPaciente,
  loginPaciente,
  logoutPaciente
} from './pacienteController.js'

export const pacienteRouter = Router()

pacienteRouter.get('/', resolver(lerPacientes))
pacienteRouter.post('/', resolver(criarPaciente))
pacienteRouter.get('/:id', resolver(lerPaciente))
pacienteRouter.put('/:id', verificaTokenJWT, resolver(atualizarPaciente))
pacienteRouter.delete('/:id', verificaTokenJWT, resolver(desativaPaciente))
pacienteRouter.patch('/:id', verificaTokenJWT, resolver(atualizarEnderecoPaciente))
pacienteRouter.post('/login', resolver(loginPaciente))
pacienteRouter.post('/logout', verificaTokenJWT, resolver(logoutPaciente))

export default (app) => {
  app.use('/paciente', pacienteRouter)
}
