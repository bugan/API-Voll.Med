import { type Request, type Response } from 'express'

const planosSaude = {
  0: 'Nenhum',
  1: 'Sulamerica',
  2: 'Unimed',
  3: 'Bradesco',
  4: 'Amil',
  5: 'Biosaude',
  6: 'Biovida',
  7: 'Outro'
}

export const planosDeSaudeGet = async (req: Request, res: Response): Promise<void> => {
  res.json(planosSaude)
}
