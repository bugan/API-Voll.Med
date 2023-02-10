
import { type Request, type Response } from 'express'
import { avaliacoes } from '../avaliacoes/avaliacoesController.js'
import { AppDataSource } from '../data-source.js'
import { Especialista } from './EspecialistaEntidade.js'

export const especialistas = async (req: Request, res: Response): Promise<void> => {
  const allEspecialistas = await AppDataSource.manager.find(Especialista)
  res.json(allEspecialistas)
}

//Post 
//verificar se o crm já existe
export const criarEspecialista = async (req: Request, res: Response): Promise<void> => {
  const {
    nome, crm, imagem, especialidade, email, telefone, planosSaude
  } = req.body

  const especialista = new Especialista(nome, crm, imagem, especialidade, email, telefone)

  await AppDataSource.manager.save(Especialista, especialista)
  res.status(200).json(especialista)
  } catch (error) {
       res.status(502).send('Especialista não foi criado')
  }
}

// Get By Id

export const especialistaById = async (req: Request, res: Response) => {
  const { id } = req.params
  const especialista = await AppDataSource.manager.findOneBy(Especialista, {
    id
  })
  console.log(especialista)
  res.json(especialista)
}

// Put
// especialista/:id
export const especialistaPut = async (req: Request, res: Response) => {
  const { nome, crm, imagem, especialidade, email, telefone} = req.body
  const { id } = req.params

  const especialistaUpdate = await AppDataSource.manager.findOneBy(Especialista, {
    id
  })

  if (especialistaUpdate !== null) {
    especialistaUpdate.nome = nome
    especialistaUpdate.crm = crm
    especialistaUpdate.imagem = imagem
    especialistaUpdate.especialidade = especialidade
    especialistaUpdate.email = email
    especialistaUpdate.telefone = telefone
    await AppDataSource.manager.save(Especialista, especialistaUpdate)
    res.json(especialistaUpdate)
  } else {
    res.status(404).json({ mensagem: 'Não encontrado' })
  }
   
}
//Delete por id especialista/:id
export const especialistaDelete = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const especialistaDel = await AppDataSource.manager.findOneBy(Especialista, {
     id:id,
    })
   if(especialistaDel !== null){
       await AppDataSource.manager.remove(Especialista, especialistaDel)
     res.json({ message: 'Especialista apagado!' })
    } else{
      res.status(400).send("Id não encontrado");
    }
  }
