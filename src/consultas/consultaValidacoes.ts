import { Between } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { Especialista } from '../especialistas/EspecialistaEntity.js'
import { Paciente } from '../pacientes/pacienteEntity.js'
import { Consulta } from './consultaEntity.js'

const horarioInicioDaClinica: number = 7
const horarioFechamentoDaClinica: number = 19

const validaClinicaEstaAberta = (data: Date): boolean => {
  const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const dataObj = new Date(data)
  const diaDaSemana = diasDaSemana[dataObj.getUTCDay()]
  const hora = dataObj.getUTCHours()
  return diaDaSemana !== 'Domingo' && hora >= horarioInicioDaClinica && hora < horarioFechamentoDaClinica
}

const validaAntecedenciaMinima = (horario: Date, antecedencia_minima): boolean => {
  const agora = new Date()
  const horarioDaConsulta = new Date(horario)

  agora.setMinutes(agora.getMinutes() - antecedencia_minima)

  return horarioDaConsulta > agora
}

const estaAtivoPaciente = async (pacienteId: string): Promise<boolean> => {
  const paciente = await AppDataSource.manager.findOneBy(Paciente, {
    id: pacienteId
  })

  return paciente?.estaAtivo ?? false
}

const estaAtivoEspecialista = async (especialistaId: string): Promise<boolean> => {
  const paciente = await AppDataSource.manager.findOneBy(Especialista, {
    id: especialistaId
  })

  return paciente?.estaAtivo ?? false
}

const pacienteEstaDisponivel = async (pacienteId: string, tempoDaData: Date): Promise<boolean> => {
  const dataObj = new Date(tempoDaData)
  const consultations = await AppDataSource.manager.find(Consulta, {
    where: {
      paciente: { id: pacienteId },
      data: Between(
        new Date(dataObj.getFullYear(), dataObj.getMonth(), dataObj.getDate(), 0, 0, 0),
        new Date(dataObj.getFullYear(), dataObj.getMonth(), dataObj.getDate(), 23, 59, 59)
      )
    }
  })
  return consultations.length === 0
}

const especialistaEstaDisponivel = async (especialistaId: string, tempoDaData: Date): Promise<boolean> => {
  const dataObj = new Date(tempoDaData)
  const consultations = await AppDataSource.manager.find(Consulta, {
    where: {
      especialista: { id: especialistaId },
      data: Between(
        new Date(dataObj.getFullYear(), dataObj.getMonth(), dataObj.getDate(), 0, 0, 0),
        new Date(dataObj.getFullYear(), dataObj.getMonth(), dataObj.getDate(), 23, 59, 59)
      )
    }
  })

  return consultations.length === 0
}

export { validaClinicaEstaAberta, validaAntecedenciaMinima, estaAtivoPaciente, estaAtivoEspecialista, pacienteEstaDisponivel, especialistaEstaDisponivel }
