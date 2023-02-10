import { Router ,Response} from 'express';
import {
  especialistas,
   criarEspecialista,
   especialistaById,
   atualizarEspecialista,
   especialistaDelete

} from './especialistaController.js'

export const especialistaRouter = Router();

especialistaRouter.get('/', especialistas)
especialistaRouter.post('/', criarEspecialista);
especialistaRouter.get('/:id', especialistaById);
especialistaRouter.put('/:id',atualizarEspecialista);
especialistaRouter.delete("/:id", especialistaDelete)

//(res:Response)=>res.status(404).send())

export default (app)=>{

  app.use('/especialista', especialistaRouter);
}
