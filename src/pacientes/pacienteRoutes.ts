import { Router } from 'express'
import { verificaTokenJWT } from '../auth/verificaTokenJWT.js'
import {
  lerPacientes,
  criarPaciente,
  lerPaciente,
  atualizarPaciente,
  desativaPaciente,
  atualizarEnderecoPaciente,
  loginPaciente,
  logoutPaciente,
} from './pacienteController.js'


export const pacienteRouter = Router()

pacienteRouter.get('/', lerPacientes)
pacienteRouter.post('/', criarPaciente)
pacienteRouter.get('/:id', lerPaciente)
pacienteRouter.put('/:id', verificaTokenJWT, atualizarPaciente)
pacienteRouter.delete('/:id', verificaTokenJWT, desativaPaciente)
pacienteRouter.patch('/:id', verificaTokenJWT, atualizarEnderecoPaciente)
pacienteRouter.post('/login', loginPaciente)
pacienteRouter.post('/logout', verificaTokenJWT, logoutPaciente)

export default (app) => {
  app.use('/paciente', pacienteRouter)
}
