import { type Request, type Response } from 'express'
import { AppDataSource } from '../data-source.js'
import { Avaliacoes } from './avaliacoesEntity.js'
import { Paciente } from '../pacientes/pacienteEntity.js'
import { Especialista } from '../especialistas/EspecialistaEntity.js'

export const avaliacoes = async (req: Request, res: Response): Promise<void> => {
  const allAvaliacoes = await AppDataSource.manager.find(Avaliacoes)
  res.json(allAvaliacoes)
}

// Get por Id

export const avaliacoesById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const avaliacoes = await AppDataSource.manager.findOneBy(Avaliacoes, {
    id
  })
  res.json(avaliacoes)
}

// Post

// fazer o get pegar os dados e no post só ids e nota

export const avaliacoesPost = async (req: Request, res: Response): Promise<void> => {
  const {
    idEspecialista, idPaciente, nota
  } = req.body
  const especialista = await AppDataSource.manager.findOneBy(Especialista, {
    id: idEspecialista
  })
  const paciente = await AppDataSource.manager.findOneBy(Paciente, {
    id: idPaciente
  })

  const avaliacao = new Avaliacoes()
  if (especialista !== null && paciente !== null) {
    avaliacao.especialista = especialista
    avaliacao.paciente = paciente
    avaliacao.nota = nota
  }
  await AppDataSource.manager.save(avaliacao)
  res.json(avaliacao)
}
