<<<<<<< HEAD
<<<<<<< HEAD
import { resolver } from '../apiError/ErrorHandler.js';
=======
import { resolver } from '../middlewareError/error.js';
>>>>>>> d3534e0 (feat: middleware de erro)
=======
import { resolver } from '../apiError/ErrorHandler.js';
>>>>>>> 81ea340 (update: middleware de erro)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 81ea340 (update: middleware de erro)
especialistaRouter.post('/', resolver(criarEspecialista));
especialistaRouter.get('/:id', resolver(especialistaById));
especialistaRouter.put('/:id',resolver(atualizarEspecialista));
especialistaRouter.delete("/:id", resolver(apagarEspecialista));
especialistaRouter.patch("/:id", resolver(atualizaContato));
<<<<<<< HEAD

=======
especialistaRouter.post('/', criarEspecialista);
especialistaRouter.get('/:id', especialistaById);
especialistaRouter.put('/:id',atualizarEspecialista);
especialistaRouter.delete("/:id", apagarEspecialista);
especialistaRouter.patch("/:id", atualizaContato);
>>>>>>> d3534e0 (feat: middleware de erro)
=======
>>>>>>> 81ea340 (update: middleware de erro)

//(res:Response)=>res.status(404).send())

export default (app)=>{

  app.use('/especialista', especialistaRouter);
}
