import { BadRequestError } from '../apiError/api-error.js'

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
    throw new BadRequestError('A lista de planos de saúde não pode ser vazia!')
  }

  return planosSaude.map((plano) => {
    if (PlanosSaude[plano] === undefined) {
      throw new BadRequestError(`O plano ${plano} não existe!`)
    }
    return PlanosSaude[plano]
  })
}

export { PlanosSaude, mapeiaPlano }
