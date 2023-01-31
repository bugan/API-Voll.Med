import { Router } from 'express';
import {
  especialistaIndex,
  especialistaPost,
  mostrarEspecialista,
  apagarEspecialista,
} from '../controllers/especialistaController'

export const especialistaRouter = Router();

especialistaRouter.get('/especialista', especialistaIndex);
especialistaRouter.post('/especialista', especialistaPost);
especialistaRouter.get('/:especialista_id', mostrarEspecialista);
especialistaRouter.delete('/:especialista_id', apagarEspecialista);