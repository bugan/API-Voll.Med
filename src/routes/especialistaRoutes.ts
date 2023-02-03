import { Router } from 'express';
import {
  especialistas,
  //especialistaIndex,
  especialistaPost,
  //mostrarEspecialista,
  //apagarEspecialista,
} from '../controllers/especialistaController.js'

export const especialistaRouter = Router();

//especialistaRouter.get('/', especialistaIndex);
especialistaRouter.get('/', especialistas)
especialistaRouter.post('/', especialistaPost);
// especialistaRouter.get('/:especialista_id', mostrarEspecialista);
// especialistaRouter.delete('/:especialista_id', apagarEspecialista);