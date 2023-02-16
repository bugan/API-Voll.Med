import { Router } from 'express'
import { avaliacoes, avaliacoesById, avaliacoesPost } from './avaliacoesController.js'

export const avaliacoesRouter = Router()

avaliacoesRouter.get('/', avaliacoes)
avaliacoesRouter.get('/:id', avaliacoesById)
avaliacoesRouter.post('/', avaliacoesPost)

export default (app) => {
  app.use('/avaliacoes', avaliacoesRouter)
}