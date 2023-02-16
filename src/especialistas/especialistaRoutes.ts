import { Router, type Response } from 'express'
import {
  especialistas,
  especialistaPost,
  especialistaById,
  especialistaPut

} from './especialistaController.js'

export const especialistaRouter = Router()

especialistaRouter.get('/', especialistas)
especialistaRouter.post('/', especialistaPost)
especialistaRouter.get('/:id', especialistaById)
especialistaRouter.put('/:id', especialistaPut)
especialistaRouter.delete('/:id', (res: Response) => res.status(404).send())

export default (app) => {
  app.use('/especialista', especialistaRouter)
}
