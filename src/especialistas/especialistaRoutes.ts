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

export const especialistaRouter = Router()

especialistaRouter.get('/', especialistas)
especialistaRouter.post('/', criarEspecialista)
especialistaRouter.get('/busca', buscarEspecialistas)
especialistaRouter.get('/:id', especialistaById)
especialistaRouter.put('/:id', atualizarEspecialista)
especialistaRouter.delete('/:id', apagarEspecialista)
especialistaRouter.patch('/:id', atualizaContato)

// (res:Response)=>res.status(404).send())

export default (app) => {
  app.use('/especialista', especialistaRouter)
}
