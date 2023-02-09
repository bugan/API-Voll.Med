import { Router ,Response} from 'express';
import {
  especialistas,
   especialistaPost,
   especialistaById,
   especialistaPut,
   especialistaDelete

} from './especialistaController.js'

export const especialistaRouter = Router();

especialistaRouter.get('/', especialistas)
especialistaRouter.post('/', especialistaPost);
especialistaRouter.get('/:id', especialistaById);
especialistaRouter.put('/:id',especialistaPut);
especialistaRouter.delete("/:id", especialistaDelete)

//(res:Response)=>res.status(404).send())

export default (app)=>{

  app.use('/especialista', especialistaRouter);
}
