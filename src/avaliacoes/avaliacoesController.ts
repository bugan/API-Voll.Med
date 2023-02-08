
import { type Request, type Response } from 'express'
import { AppDataSource } from '../data-source.js'
import { Avaliacoes } from './avaliacoesEntity.js'

export const avaliacoes = async (req: Request, res: Response): Promise<void> => {
  const allAvaliacoes = await AppDataSource.manager.find(Avaliacoes)
  res.json(allAvaliacoes)
}
