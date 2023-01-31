import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

interface IEspecialista {
  id: string;
  imagem: string;
  nome: string;
  especialidade: string;
  nota: number;
  email: string;

}

//não ter duas consultas no mesmo horário

const especialistaMemoria: IEspecialista[] = [];

export const especialistaIndex = async (req: Request, res: Response) => {
  res.json(especialistaMemoria);
};

export const especialistaPost = async (req: Request, res: Response) => {
  const { nome, imagem, especialidade, nota, email } = req.body;

  const id = randomUUID();

  const especialista: IEspecialista = {
    id,
    nome,
    imagem,
    especialidade,
    nota,
    email,

  };
  especialistaMemoria.push(especialista);
  res.json(especialista)

};

export const mostrarEspecialista = async (req: Request, res: Response) => {
  const { especialista_id } = req.params;

  const especialista = especialistaMemoria.find((especialista) => especialista.id === especialista_id);
  res.json(especialista)

}

export const apagarEspecialista = async (req: Request, res: Response) => {

  const { especialista_id } = req.params;
  const especialistaIndex = especialistaMemoria.findIndex((especialista) => especialista.id === especialista_id);
  especialistaMemoria.splice(especialistaIndex, 1);
  res.json({ message: 'Especialista apagado' })
}