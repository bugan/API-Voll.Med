import { type Request, type Response } from 'express'
import { AppDataSource } from '../data-source.js'
import { Consulta } from './consultaEntity.js'
import {
  estaAtivoEspecialista,
  estaAtivoPaciente,
  validaAntecedenciaMinima,
  validaClinicaEstaAberta,
  pacienteEstaDisponivel,
  especialistaEstaDisponivel
} from './consultaValidacoes.js'
import { mapeiaLembretes } from '../utils/consultaUtils.js'
import { AppError, Status } from '../error/ErrorHandler.js'

export const criaConsulta = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { especialista, paciente, data, desejaLembrete, lembretes } = req.body

  if (!validaClinicaEstaAberta(data)) {
    throw new AppError('A clinica não está aberta nesse horário')
  }

  if (!validaAntecedenciaMinima(data, 30)) {
    throw new AppError(
      'A consulta deve ser agendada com 30 minutos de antecedência', Status.BAD_REQUEST
    )
  }
  const situacaoPaciente = await estaAtivoPaciente(paciente)
  if (!situacaoPaciente) {
    throw new AppError('Paciente não está ativo', Status.BAD_REQUEST)
  }

  const situacaoEspecialista = await estaAtivoEspecialista(especialista)

  if (!situacaoEspecialista) {
    throw new AppError('Especialista não está ativo', Status.BAD_REQUEST)
  }

  if (!(await pacienteEstaDisponivel(paciente, data))) {
    throw new AppError('Paciente não está disponível nesse horário', Status.BAD_REQUEST)
  }

  if (!(await especialistaEstaDisponivel(especialista, data))) {
    throw new AppError('Paciente não está disponível nesse horário', Status.BAD_REQUEST)
  }

  const consulta = new Consulta()

  consulta.especialista = especialista
  consulta.paciente = paciente
  consulta.data = data
  consulta.desejaLembrete = desejaLembrete

  if (desejaLembrete === true && lembretes !== undefined) {
    consulta.lembretes = mapeiaLembretes(lembretes)
  }
  await AppDataSource.manager.save(Consulta, consulta)
  return res.json(consulta)
}

export const listaConsultas = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const consultas = await AppDataSource.manager.find(Consulta)

  return res.json(consultas)
}

//! Não devolve resposta ao cliente, caso não encontre a consulta
export const buscaConsultaPorId = async (req: Request, res: Response
): Promise<void> => {
  const { id } = req.params
  const consulta = await AppDataSource.manager.findOne(Consulta, { where: { id }, relations: ['paciente', 'especialista'] })

  if (consulta !== null) {
    res.json(consulta)
  } else {
    throw new AppError('Consulta não encontrada', Status.BAD_REQUEST)
  }
  // if (!consulta) {
  //   throw new AppError("Consulta não encontrada");
  // }
  // res.json(consulta);
}

export const deletaConsulta = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { motivo_cancelamento } = req.body
  const consulta = await AppDataSource.manager.findOne(Consulta, {
    where: { id }
  })

  if (consulta == null) {
    throw new AppError('Consulta não encontrada')
  }

  const HORA = 60 * 24
  if (!validaAntecedenciaMinima(consulta.data, HORA)) {
    throw new AppError(
      'A consulta deve ser desmarcada com 1 dia de antecedência'
    )
  }

  consulta.cancelar = motivo_cancelamento

  await AppDataSource.manager.delete(Consulta, { id })
  res.json('Consulta cancelada com sucesso')
}
