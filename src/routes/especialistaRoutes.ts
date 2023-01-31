import { Router } from 'express';
import {
  especialistaIndex,
  especialistaPost,
  mostrarEspecialista,
  apagarEspecialista,
} from '../controllers/especialistaController.js'

export const especialistaRouter = Router();

especialistaRouter.get('/', especialistaIndex);
especialistaRouter.post('/', especialistaPost);
especialistaRouter.get('/:especialista_id', mostrarEspecialista);
especialistaRouter.delete('/:especialista_id', apagarEspecialista);