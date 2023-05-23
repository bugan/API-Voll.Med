import { Router } from 'express'
import { verificaTokenJWT } from '../auth/middlewares/authMiddlewares.js'

import multer from 'multer'
import { Role } from '../auth/roles.js'
import multerConfig from '../config/multer.js'
import { criaImagem, destroiImagem, listaImagemPaciente } from './PacienteImagemController.js'
import {
  atualizarEnderecoPaciente,
  atualizarPaciente,
  criarPaciente,
  desativaPaciente,
  exibeTodosPacientes,
  lerPaciente,
  listaConsultasPaciente
} from './pacienteController.js'

const upload = multer(multerConfig)

export const pacienteRouter = Router()

pacienteRouter.get('/', exibeTodosPacientes)
pacienteRouter.post('/', criarPaciente)
pacienteRouter.get('/:id', lerPaciente)
pacienteRouter.get('/:id/consultas', listaConsultasPaciente)
pacienteRouter.put('/:id', verificaTokenJWT(Role.paciente), atualizarPaciente)
pacienteRouter.delete(
  '/:id',
  verificaTokenJWT(Role.paciente),
  desativaPaciente
)
pacienteRouter.patch(
  '/:id',
  verificaTokenJWT(Role.paciente),
  atualizarEnderecoPaciente
)

pacienteRouter.post(
  '/:id/images',
  upload.single('file'),
  criaImagem
)

pacienteRouter.get(
  '/:id/images',
  upload.single('file'),
  listaImagemPaciente
)

pacienteRouter.delete(
  '/:id/images',
  verificaTokenJWT(Role.paciente),
  destroiImagem
)
export default (app) => {
  app.use('/paciente', pacienteRouter)
}
