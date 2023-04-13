import { Router, Response } from 'express'
import {
  especialistas,
  criarEspecialista,
  especialistaById,
  atualizarEspecialista,
  apagarEspecialista,
  atualizaContato,
  buscarEspecialistas
} from './especialistaController.js'
import { Role } from '../auth/roles.js'
import { verificaTokenJWT } from '../auth/verificaTokenJWT.js'

export const especialistaRouter = Router()

especialistaRouter.get('/', especialistas)
especialistaRouter.post('/', verificaTokenJWT(Role.clinica), criarEspecialista)
especialistaRouter.get('/busca', buscarEspecialistas)
especialistaRouter.get('/:id', especialistaById)
especialistaRouter.put(
  '/:id',
  verificaTokenJWT(Role.especialista),
  atualizarEspecialista
)
especialistaRouter.delete(
  '/:id',
  verificaTokenJWT(Role.clinica, Role.especialista),
  apagarEspecialista
)
especialistaRouter.patch('/:id', atualizaContato)

export default (app) => {
  app.use('/especialista', especialistaRouter)
}
