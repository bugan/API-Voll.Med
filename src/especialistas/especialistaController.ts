import { type Request, type Response } from 'express'
import { AppDataSource } from '../data-source.js'
import { Especialista } from './EspecialistaEntity.js'
import { BadRequestError, NotFoundError } from '../apiError/api-error.js'
import { mapeiaPlano } from '../utils/planoSaudeUtils.js'

// Get All
export const especialistas = async (
  req: Request,
  res: Response
): Promise<void> => {
  const allEspecialistas = await AppDataSource.manager.find(Especialista)
  if (allEspecialistas.length > 0) {
    res.status(200).json(allEspecialistas)
  } else {
    throw new NotFoundError('Não encontramos especialistas')
  }
}
// Post
// Se o especialista for criado apenas com os atributos opcionais, enviar mensagem avisando quais campos faltam
export const criarEspecialista = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { nome, crm, imagem, especialidade, email, telefone, estaAtivo, possuiPlanoSaude, planosSaude } = req.body

  if (possuiPlanoSaude === true && planosSaude !== undefined) {
    // transforma array de numbers em array de strings com os nomes dos planos definidos no enum correspondente
    planosSaude = mapeiaPlano(planosSaude)
  }

  const especialista = new Especialista(
    nome,
    crm,
    imagem,
    estaAtivo,
    especialidade,
    email,
    telefone, possuiPlanoSaude, planosSaude
  )

  try {
    await AppDataSource.manager.save(Especialista, especialista)
    res.status(200).json(especialista)
  } catch (error) {
    if ((await AppDataSource.manager.findOne(Especialista, { where: { crm } })) != null) {
      res.status(422).json({ message: 'Crm já cadastrado' })
    } else {
      console.log(error)
      throw new BadRequestError('Especialista não foi criado')
    }
  }
}
// Get By Id
export const especialistaById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const especialista = await AppDataSource.manager.findOneBy(Especialista, {
    id
  })

  if (especialista !== null) {
    res.status(200).json(especialista)
  } else {
    throw new NotFoundError('Id não encontrado ')
  }
}

// Put especialista/:id
export const atualizarEspecialista = async (req: Request, res: Response): Promise<void> => {
  let { nome, crm, imagem, especialidade, email, telefone, estaAtivo, possuiPlanoSaude, planosSaude } = req.body
  const { id } = req.params

  if (possuiPlanoSaude === true && planosSaude !== undefined) {
    // transforma array de numbers em array de strings com os nomes dos planos definidos no enum correspondente
    planosSaude = mapeiaPlano(planosSaude)
  }

  const especialistaUpdate = await AppDataSource.manager.findOneBy(
    Especialista,
    {
      id
    }
  )
  if (especialistaUpdate !== null) {
    especialistaUpdate.nome = nome
    especialistaUpdate.crm = crm
    especialistaUpdate.estaAtivo = estaAtivo
    especialistaUpdate.imagem = imagem
    especialistaUpdate.especialidade = especialidade
    especialistaUpdate.email = email
    especialistaUpdate.telefone = telefone
    especialistaUpdate.possuiPlanoSaude = possuiPlanoSaude
    especialistaUpdate.planosSaude = planosSaude

    await AppDataSource.manager.save(Especialista, especialistaUpdate)
    res.json(especialistaUpdate)
  } else {
    throw new BadRequestError('Id não encontrado ')
  }
}

// Delete por id especialista/:id
export const apagarEspecialista = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const especialistaDel = await AppDataSource.manager.findOneBy(Especialista, {
    id
  })
  if (especialistaDel !== null) {
    await AppDataSource.manager.remove(Especialista, especialistaDel)
    res.json({ message: 'Especialista apagado!' })
  } else {
    throw new BadRequestError('Id não encontrado')
  }
}

// patch
export const atualizaContato = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const buscaEspecialista = await AppDataSource.manager.findOneBy(
    Especialista,
    { id }
  )
  const telefone = req.body.telefone

  if (buscaEspecialista !== null) {
    buscaEspecialista.telefone = telefone
    await AppDataSource.createQueryBuilder()
      .update(Especialista, buscaEspecialista)
      .where(buscaEspecialista.telefone)
      .set({ telefone })
      .execute()
    res.status(200).json(buscaEspecialista)
  } else {
    throw new BadRequestError('Telefone não atualizado')
  }
}
