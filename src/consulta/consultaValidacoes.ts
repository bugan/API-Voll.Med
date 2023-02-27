import { Between } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Especialista } from '../especialistas/EspecialistaEntidade'
import { Paciente } from '../pacientes/pacienteEntity'
import { Consulta } from './consultaEntity'

const horarioInicioDaClinica: string = '07:00'
const horarioFechamentoDaClinica: string = '19:00'

export const validaClinicaEstaAberta = (tempoDaData: Date): boolean => {
  const data = tempoDaData.toDateString()
  const tempoInicial = new Date(`${data} ${horarioInicioDaClinica}`)
  const tempoFinal = new Date(`${data} ${horarioFechamentoDaClinica}`)
  return tempoDaData >= tempoInicial && tempoDaData <= tempoFinal
}

// export const validaDuracaoConsulta = async (tempoInicio: Date, tempoFim: Date): Promise<boolean> => {
//   const duracaoConsulta = 60 * 60 * 1000 // 1 HORA DE DURACAO
//   return tempoFim.getTime() - tempoInicio.getTime() === duracaoConsulta
// }

export const validaAntecedenciaMinima = (horarioDaConsulta: Date): boolean => {
  const tempoMinimoAgendamento = 30 * 60 * 1000 // 30 MINUTOS DE ANTECEDENCIA
  const tempoAgora = new Date()
  return horarioDaConsulta.getTime() - tempoAgora.getTime() >= tempoMinimoAgendamento
}

export const estaAtivoPaciente = async (pacienteId: string): Promise<boolean> => {
  const paciente = await AppDataSource.manager.findOneBy(Paciente, {
    id: pacienteId
  })

  return paciente?.estaAtivo ?? false
}

export const estaAtivoEspecialista = async (especialistaId: string): Promise<boolean> => {
  const paciente = await AppDataSource.manager.findOneBy(Especialista, {
    id: especialistaId
  })

  return paciente?.estaAtivo ?? false
}

export const pacienteEstaDisponivel = async (pacienteId: string, tempoDaData: Date): Promise<boolean> => {
  const consultations = await AppDataSource.manager.find(Consulta, {
    where: {
      paciente: { id: pacienteId },
      data: Between(
        new Date(tempoDaData.getFullYear(), tempoDaData.getMonth(), tempoDaData.getDate(), 0, 0, 0),
        new Date(tempoDaData.getFullYear(), tempoDaData.getMonth(), tempoDaData.getDate(), 23, 59, 59)
      )
    }
  })
  return consultations.length === 0
}

export const medicoEstaDisponivel = async (especialistaId: string, tempoInicio: Date): Promise<boolean> => {
  const consulta = await AppDataSource.manager.findOne(Consulta, {
    where: { especialista: { id: especialistaId }, data: tempoInicio }
  })
  return consulta == null
}

// TODO escolher médico aleatório
