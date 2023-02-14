import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Especialista } from "./EspecialistaEntidade.js";
<<<<<<< HEAD
import { BadRequestError, NotFoundError } from "../apiError/api-error.js";
=======
>>>>>>> dc032a5 (feat: erro post crm duplicado)

//Get All
export const especialistas = async (
  req: Request,
  res: Response
): Promise<void> => {
<<<<<<< HEAD
  const allEspecialistas = await AppDataSource.manager.find(Especialista);
  if (allEspecialistas.length) {
=======
  if (especialistas !== null) {
    const allEspecialistas = await AppDataSource.manager.find(Especialista);
>>>>>>> dc032a5 (feat: erro post crm duplicado)
    res.status(200).json(allEspecialistas);
  } else {
    throw new NotFoundError("Não encontramos especialistas");
  }
};

//Post
//Se o especialista for criado apenas com os atributos opcionais, enviar mensagem avisando quais campos faltam
export const criarEspecialista = async (
  req: Request,
  res: Response
): Promise<void> => {
<<<<<<< HEAD
  const { nome, crm, imagem, especialidade, email, telefone } = req.body;
=======
  const { nome, crm, imagem, especialidade, email, telefone, nota } = req.body;
>>>>>>> dc032a5 (feat: erro post crm duplicado)

  const especialista = new Especialista(
    nome,
    crm,
    imagem,
    especialidade,
    email,
<<<<<<< HEAD
    telefone
=======
    telefone,
    nota
>>>>>>> dc032a5 (feat: erro post crm duplicado)
  );

  try {
    await AppDataSource.manager.save(Especialista, especialista);
    res.status(200).json(especialista);
  } catch (Error) {
    if (await AppDataSource.manager.findOne(Especialista, { where: { crm } })) {
      res.status(422).json({ message: "Crm já cadastrado" });
    } else {
<<<<<<< HEAD
      throw new BadRequestError("Especialista não foi criado");
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
    console.log("especialista", especialista);
    res.status(200).json(especialista);
  } else {
    throw new NotFoundError("Id não encontrado ");
  }
};

//Put especialista/:id
export const atualizarEspecialista = async (req: Request, res: Response) => {
  const { nome, crm, imagem, especialidade, email, telefone } = req.body;
=======
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
>>>>>>> dc032a5 (feat: erro post crm duplicado)
  const { id } = req.params;

  const especialistaUpdate = await AppDataSource.manager.findOneBy(
    Especialista,
    {
      id: id,
    }
  );

<<<<<<< HEAD
  //validar crm do especialista (front? clínica com role de adm)
=======
>>>>>>> dc032a5 (feat: erro post crm duplicado)
  if (especialistaUpdate !== null) {
    especialistaUpdate.nome = nome;
    especialistaUpdate.crm = crm;
    especialistaUpdate.imagem = imagem;
    especialistaUpdate.especialidade = especialidade;
    especialistaUpdate.email = email;
    especialistaUpdate.telefone = telefone;
<<<<<<< HEAD
    await AppDataSource.manager.save(Especialista, especialistaUpdate);
    res.json(especialistaUpdate);
  } else {
    throw new BadRequestError("Id não encontrado ");
  }
};

=======
    especialistaUpdate.nota = nota;
    await AppDataSource.manager.save(Especialista, especialistaUpdate);
    res.json(especialistaUpdate);
  } else {
    res.status(404).send("Não encontrado");
  }
};
>>>>>>> dc032a5 (feat: erro post crm duplicado)
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
<<<<<<< HEAD
    throw new BadRequestError("Id não encontrado");
=======
    res.status(400).send("Id não encontrado");
>>>>>>> dc032a5 (feat: erro post crm duplicado)
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
<<<<<<< HEAD
=======
  console.log("Id encontrado");
  // res.send('Id encontrado')
>>>>>>> dc032a5 (feat: erro post crm duplicado)

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
<<<<<<< HEAD
    throw new BadRequestError("Telefone não atualizado");
=======
    res.status(400).send({ message: "Contato não atualizado" });
>>>>>>> dc032a5 (feat: erro post crm duplicado)
  }
};
