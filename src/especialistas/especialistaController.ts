import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Especialista } from "./EspecialistaEntidade.js";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { BadRequestError, NotFoundError } from "../apiError/api-error.js";
=======
>>>>>>> dc032a5 (feat: erro post crm duplicado)
=======
import {BadRequestError} from '../helper/api-error.js'
>>>>>>> d3534e0 (feat: middleware de erro)
=======
import {BadRequestError, NotFoundError} from '../apiError/api-error.js'
>>>>>>> 81ea340 (update: middleware de erro)
=======
import { BadRequestError, NotFoundError } from "../apiError/api-error.js";
>>>>>>> 27bad80 (update)

//Get All
export const especialistas = async (
  req: Request,
  res: Response
): Promise<void> => {
<<<<<<< HEAD
<<<<<<< HEAD
  const allEspecialistas = await AppDataSource.manager.find(Especialista);
  if (allEspecialistas.length) {
=======
  if (especialistas !== null) {
    const allEspecialistas = await AppDataSource.manager.find(Especialista);
>>>>>>> dc032a5 (feat: erro post crm duplicado)
=======
  const allEspecialistas = await AppDataSource.manager.find(Especialista);
<<<<<<< HEAD
  if (Object.keys(allEspecialistas).length) {
>>>>>>> 6c76314 (controller com casos de uso)
    res.status(200).json(allEspecialistas);
  } else {
<<<<<<< HEAD
    throw new NotFoundError("Não encontramos especialistas");
=======
    //res.status(400).send({message: "Não encontramos especialistas"})
    throw new BadRequestError('Não encontramos especialistas') //verificar se funciona
>>>>>>> d3534e0 (feat: middleware de erro)
=======
  if (allEspecialistas.length) {
    res.status(200).json(allEspecialistas);
  } else {
<<<<<<< HEAD
      throw new BadRequestError() //verificar se funciona 'Não encontramos especialistas'
>>>>>>> 81ea340 (update: middleware de erro)
=======
    throw new NotFoundError("Não encontramos especialistas");
>>>>>>> 27bad80 (update)
  }
<<<<<<< HEAD
}
//Post 
//verificar se o crm já existe
//Se o especialista for criado apenas com os atributos opcionais, enviar mensagem avisando quais campos faltam
export const criarEspecialista = async (req: Request, res: Response): Promise<void> => {
  const {
    nome, crm, imagem, especialidade, email, telefone, nota
  } = req.body;
  
  const especialista = new Especialista( nome, crm, imagem, especialidade, email, telefone, nota)
  try {
  await AppDataSource.manager.save(Especialista, especialista)
  res.status(200).json(especialista)
  } catch (error) {
    !especialista 
    res.status(400).send('Especialista não criado')
  }
}
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
=======
};

//Post
//Se o especialista for criado apenas com os atributos opcionais, enviar mensagem avisando quais campos faltam
export const criarEspecialista = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nome, crm, imagem, especialidade, email, telefone } = req.body;

  const especialista = new Especialista(
    nome,
    crm,
    imagem,
    especialidade,
    email,
    telefone
  );

  try {
    await AppDataSource.manager.save(Especialista, especialista);
    res.status(200).json(especialista);
  } catch (Error) {
    if (await AppDataSource.manager.findOne(Especialista, { where: { crm } })) {
      res.status(422).json({ message: "Crm já cadastrado" });
    } else {
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

<<<<<<< HEAD
<<<<<<< HEAD
  if (especialista !== null) {
    console.log(especialista);
    res.status(200).json(especialista);
  } else {
    res.status(404).send("Id não encontrado");
>>>>>>> dc032a5 (feat: erro post crm duplicado)
=======
  if(especialista !== null){
    console.log('especialista',especialista);
    res.status(200).json(especialista)
  }else{
    throw new NotFoundError('Id não encontrado ')
>>>>>>> 81ea340 (update: middleware de erro)
=======
  if (especialista !== null) {
    console.log("especialista", especialista);
    res.status(200).json(especialista);
  } else {
    throw new NotFoundError("Id não encontrado ");
>>>>>>> 27bad80 (update)
  }
};

//Put especialista/:id
<<<<<<< HEAD
export const especialistaPut =async (req:Request, res:Response) => {
  const {nome, crm, imagem, especialidade, email, telefone, nota} = req.body;
  const {id} = req.params

  //validar crm do especialista (front? clínica com role de adm)
=======
export const atualizarEspecialista = async (req: Request, res: Response) => {
  const { nome, crm, imagem, especialidade, email, telefone } = req.body;
  const { id } = req.params;

  const especialistaUpdate = await AppDataSource.manager.findOneBy(
    Especialista,
    {
      id: id,
<<<<<<< HEAD
<<<<<<< HEAD
    }
  );
<<<<<<< HEAD

>>>>>>> dc032a5 (feat: erro post crm duplicado)
=======
=======
    });
  
>>>>>>> 81ea340 (update: middleware de erro)
//validar crm do especialista (front? clínica com role de adm)
>>>>>>> 6c76314 (controller com casos de uso)
=======
    }
  );

  //validar crm do especialista (front? clínica com role de adm)
>>>>>>> 27bad80 (update)
  if (especialistaUpdate !== null) {
    especialistaUpdate.nome = nome;
    especialistaUpdate.crm = crm;
    especialistaUpdate.imagem = imagem;
    especialistaUpdate.especialidade = especialidade;
    especialistaUpdate.email = email;
    especialistaUpdate.telefone = telefone;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

    await AppDataSource.manager.save(Especialista, especialistaUpdate);
    res.json(especialistaUpdate);
  } else {
    throw new BadRequestError("Id não encontrado ");
  }
};

=======
    especialistaUpdate.nota = nota;
=======
    
>>>>>>> 81ea340 (update: middleware de erro)
=======

>>>>>>> 27bad80 (update)
    await AppDataSource.manager.save(Especialista, especialistaUpdate);
    res.json(especialistaUpdate);
  } else {
    throw new BadRequestError("Id não encontrado ");
  }
};
<<<<<<< HEAD
>>>>>>> dc032a5 (feat: erro post crm duplicado)
=======

>>>>>>> 81ea340 (update: middleware de erro)
//Delete por id especialista/:id
export const apagarEspecialista = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const especialistaDel = await AppDataSource.manager.findOneBy(Especialista, {
<<<<<<< HEAD
     id:id ,
    })
    try {
      await AppDataSource.manager.remove(Especialista, especialistaDel)
     res.json({ message: 'Especialista apagado!' })
    } catch (error) {
     
      res.status(404).send("Id não encontrado");
    }
=======
    id: id,
  });
  if (especialistaDel !== null) {
    await AppDataSource.manager.remove(Especialista, especialistaDel);
    res.json({ message: "Especialista apagado!" });
  } else {
<<<<<<< HEAD
    res.status(400).send("Id não encontrado");
>>>>>>> dc032a5 (feat: erro post crm duplicado)
=======
    throw new BadRequestError("Id não encontrado");
>>>>>>> 81ea340 (update: middleware de erro)
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

  const telefone = req.body.telefone;

<<<<<<< HEAD
    if(buscaEspecialista !== null){
      buscaEspecialista.telefone = telefone
      await AppDataSource.createQueryBuilder().update(Especialista, buscaEspecialista).where(buscaEspecialista.telefone).set({telefone:telefone}).execute()
      res.status(200).json(buscaEspecialista)
      }else{
      res.status(400).send({message:'Contato não atualizado'})
   
    }
           
  }
=======
  if (buscaEspecialista !== null) {
    buscaEspecialista.telefone = telefone;
    await AppDataSource.createQueryBuilder()
      .update(Especialista, buscaEspecialista)
      .where(buscaEspecialista.telefone)
      .set({ telefone: telefone })
      .execute();
    res.status(200).json(buscaEspecialista);
  } else {
    throw new BadRequestError("Telefone não atualizado");
  }
};
>>>>>>> dc032a5 (feat: erro post crm duplicado)
