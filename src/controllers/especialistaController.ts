import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { Especialista } from '../entities/EspecialistaEntidade.js';

export const especialistas = async(req: Request, res: Response) => {
  const allEspecialistas = await AppDataSource.manager.find(Especialista)
  res.json(allEspecialistas)
}

export const especialistaPost =async (req: Request, res: Response) => {
  const {
    nome, crm, imagem, especialidade, email, telefone, nota, planosSaude,
  } = req.body;

  const especialista = new Especialista()
  especialista.nome =nome
  especialista.crm = crm
  especialista.imagem = imagem
  especialista.especialidade = especialidade
  especialista.email = email
  especialista.telefone = telefone
  especialista.nota = nota
  especialista.planosSaude = planosSaude

  await AppDataSource.manager.save(especialista)
  res.json(especialista)
  
}

//  nome, crm, imagem, especialidade, email, telefone, nota, planosSaude,

// interface IEspecialista {
//   id: string;
//   imagem: string;
//   nome: string;
//   especialidade: string;
//   nota: number;
//   email: string;

// }

// //não ter duas consultas no mesmo horário

// const especialistaMemoria: IEspecialista[] = [];

// export const especialistaIndex = async (req: Request, res: Response) => {
//   res.json(especialistaMemoria);
// };

// export const especialistaPost = async (req: Request, res: Response) => {
//   const { nome, imagem, especialidade, nota, email } = req.body;

//   const id = randomUUID();

//   const especialista: IEspecialista = {
//     id,
//     nome,
//     imagem,
//     especialidade,
//     nota,
//     email,

//   };
//   especialistaMemoria.push(especialista);
//   res.json(especialista)

// };

// export const mostrarEspecialista = async (req: Request, res: Response) => {
//   const { especialista_id } = req.params;

//   const especialista = especialistaMemoria.find((especialista) => especialista.id === especialista_id);
//   res.json(especialista)

// }

// export const apagarEspecialista = async (req: Request, res: Response) => {

//   const { especialista_id } = req.params;
//   const especialistaIndex = especialistaMemoria.findIndex((especialista) => especialista.id === especialista_id);
//   especialistaMemoria.splice(especialistaIndex, 1);
//   res.json({ message: 'Especialista apagado' })
// }