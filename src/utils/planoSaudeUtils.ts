import { AppError } from '../error/ErrorHandler.js'

enum PlanosSaude {
  'Sulamerica',
  'Unimed',
  'Bradesco',
  'Amil',
  'Biosaude',
  'Biovida',
  'Outro',
}

function mapeiaPlano (planosSaude: any[]): string[] {
  if (planosSaude.length === 0) {
    throw new AppError('A lista de planos de saúde não pode ser vazia!')
  }

  return planosSaude.map((plano) => {
    if (PlanosSaude[plano] === undefined) {
      throw new AppError(`O plano ${plano} não existe!`)
    }
    return PlanosSaude[plano]
  })
}

export { PlanosSaude, mapeiaPlano }
