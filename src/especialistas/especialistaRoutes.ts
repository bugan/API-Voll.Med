import { resolver } from '../middlewareError/error.js';
import { Router ,Response} from 'express';
import {
  especialistas,
   criarEspecialista,
   especialistaById,
   atualizarEspecialista,
   apagarEspecialista,
   atualizaContato

} from './especialistaController.js'

export const especialistaRouter = Router();

especialistaRouter.get('/', resolver(especialistas))
especialistaRouter.post('/', criarEspecialista);
especialistaRouter.get('/:id', especialistaById);
especialistaRouter.put('/:id',atualizarEspecialista);
especialistaRouter.delete("/:id", apagarEspecialista);
especialistaRouter.patch("/:id", atualizaContato);

//(res:Response)=>res.status(404).send())

export default (app)=>{

  app.use('/especialista', especialistaRouter);
}
