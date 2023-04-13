import { AppError } from '../error/ErrorHandler.js'

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
    // throw new AppError('A lista de lembretes não pode ser vazia!')
  }

  return lembretes.map((lembrete) => {
    if (Lembrete[lembrete] === undefined) {
      throw new AppError(`O lembrete ${lembrete} não existe!`)
    }
    return Lembrete[lembrete]
  })
}

function mapeiaMotivoCancelamento (motivos: any[]): string[] {
  return motivos.map((motivo) => {
    if (MotivoCancelamento[motivo] === undefined) {
      throw new AppError(`O motivo ${motivo} não existe!`)
    }
    return MotivoCancelamento[motivo]
  })
}

export { MotivoCancelamento, Lembrete, mapeiaMotivoCancelamento, mapeiaLembretes }
