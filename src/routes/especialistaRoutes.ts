import { Router } from 'express';
import {
  especialistas,
   especialistaPost,
   especialistaById,
   especialistaPut,
  //mostrarEspecialista,
  //apagarEspecialista,
} from '../controllers/especialistaController.js'

export const especialistaRouter = Router();

//especialistaRouter.get('/', especialistaIndex);
especialistaRouter.get('/', especialistas)
especialistaRouter.post('/', especialistaPost);
especialistaRouter.get('/:especialista_id', especialistaById);
especialistaRouter.put('/:especialista_id',especialistaPut)
// especialistaRouter.delete('/:especialista_id', apagarEspecialista);