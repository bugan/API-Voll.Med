import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Especialista } from "./EspecialistaEntidade.js";
import {BadRequestError} from '../helper/api-error.js'

//Get All
export const especialistas = async (
  req: Request,
  res: Response
): Promise<void> => {
  const allEspecialistas = await AppDataSource.manager.find(Especialista);
  if (Object.keys(allEspecialistas).length) {
    res.status(200).json(allEspecialistas);
  } else {
    //res.status(400).send({message: "Não encontramos especialistas"})
    throw new BadRequestError('Não encontramos especialistas') //verificar se funciona
  }
};

//Post
//Se o especialista for criado apenas com os atributos opcionais, enviar mensagem avisando quais campos faltam
export const criarEspecialista = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nome, crm, imagem, especialidade, email, telefone, nota } = req.body;

  const especialista = new Especialista(
    nome,
    crm,
    imagem,
    especialidade,
    email,
    telefone,
    nota
  );

  try {
    await AppDataSource.manager.save(Especialista, especialista);
    res.status(200).json(especialista);
  } catch (Error) {
    if (await AppDataSource.manager.findOne(Especialista, { where: { crm } })) {
      res.status(422).json({ message: "Crm já cadastrado" });
    } else {
      res.status(502).send("Especialista não foi criado");
    }
  }
};
//Get By Id
export const especialistaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const especialista = await AppDataSource.manager.findOneBy(Especialista, {
    id: id,
  });

  if (especialista !== null) {
    console.log(especialista);
    res.status(200).json(especialista);
  } else {
    res.status(404).send("Id não encontrado");
  }
};

//Put especialista/:id
export const atualizarEspecialista = async (req: Request, res: Response) => {
  const { nome, crm, imagem, especialidade, email, telefone, nota } = req.body;
  const { id } = req.params;

  const especialistaUpdate = await AppDataSource.manager.findOneBy(
    Especialista,
    {
      id: id,
    }
  );
//validar crm do especialista (front? clínica com role de adm)
  if (especialistaUpdate !== null) {
    especialistaUpdate.nome = nome;
    especialistaUpdate.crm = crm;
    especialistaUpdate.imagem = imagem;
    especialistaUpdate.especialidade = especialidade;
    especialistaUpdate.email = email;
    especialistaUpdate.telefone = telefone;
    especialistaUpdate.nota = nota;
    await AppDataSource.manager.save(Especialista, especialistaUpdate);
    res.json(especialistaUpdate);
  } else {
    res.status(404).send("Não encontrado");
  }
};
//Delete por id especialista/:id
export const apagarEspecialista = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const especialistaDel = await AppDataSource.manager.findOneBy(Especialista, {
    id: id,
  });
  if (especialistaDel !== null) {
    await AppDataSource.manager.remove(Especialista, especialistaDel);
    res.json({ message: "Especialista apagado!" });
  } else {
    res.status(400).send("Id não encontrado");
  }
};

//patch
export const atualizaContato = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const buscaEspecialista = await AppDataSource.manager.findOneBy(
    Especialista,
    { id: id }
  );
  console.log("Id encontrado");
  // res.send('Id encontrado')

  const telefone = req.body.telefone;

  if (buscaEspecialista !== null) {
    buscaEspecialista.telefone = telefone;
    await AppDataSource.createQueryBuilder()
      .update(Especialista, buscaEspecialista)
      .where(buscaEspecialista.telefone)
      .set({ telefone: telefone })
      .execute();
    res.status(200).json(buscaEspecialista);
  } else {
    res.status(400).send({ message: "Contato não atualizado" });
  }
};
