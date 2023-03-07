import { type Request, type Response } from 'express'

const planosSaude = {
  nenhum: 'NENHUM',
  sulamerica: 'SULAMERICA',
  unimed: 'UNIMED',
  bradesco: 'BRADESCO',
  amil: 'AMIL',
  biosaude: 'BIOSAUDE',
  biovida: 'BIOVIDA',
  outro: 'OUTRO'
}

export const planosDeSaudeGet = async (req: Request, res: Response): Promise<void> => {
  res.json(planosSaude)
}
