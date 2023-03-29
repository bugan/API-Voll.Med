import { BadRequestError } from '../apiError/api-error.js'

enum MotivoCancelamento {
  paciente_desistiu,
  médico_cancelou,
  outros
}

enum Lembrete {
  email,
  sms,
}

function mapeiaLembretes (lembretes: any[]): string[] {
  if (lembretes.length === 0) {
    // throw new BadRequestError('A lista de lembretes não pode ser vazia!')
  }

  return lembretes.map((lembrete) => {
    if (Lembrete[lembrete] === undefined) {
      throw new BadRequestError(`O lembrete ${lembrete} não existe!`)
    }
    return Lembrete[lembrete]
  })
}

function mapeiaMotivoCancelamento (motivos: any[]): string[] {
  return motivos.map((motivo) => {
    if (MotivoCancelamento[motivo] === undefined) {
      throw new BadRequestError(`O motivo ${motivo} não existe!`)
    }
    return MotivoCancelamento[motivo]
  })
}

export { MotivoCancelamento, Lembrete, mapeiaMotivoCancelamento, mapeiaLembretes }
