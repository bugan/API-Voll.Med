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
import { BadRequestError, NotFoundError } from '../apiError/api-error.js'

export const criaConsulta = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { especialista, paciente, data, desejaLembrete, lembretes } = req.body

  if (!validaClinicaEstaAberta(data)) {
    throw new BadRequestError('A clinica não está aberta nesse horário')
  }

  if (!validaAntecedenciaMinima(data, 30)) {
    throw new BadRequestError(
      'A consulta deve ser agendada com 30 minutos de antecedência'
    )
  }
  const situacaoPaciente = await estaAtivoPaciente(paciente)
  if (!situacaoPaciente) {
    throw new BadRequestError('Paciente não está ativo')
  }

  const situacaoEspecialista = await estaAtivoEspecialista(especialista)

  if (!situacaoEspecialista) {
    throw new BadRequestError('Especialista não está ativo')
  }

  if (!(await pacienteEstaDisponivel(paciente, data))) {
    throw new BadRequestError('Paciente não está disponível nesse horário')
  }

  if (!(await especialistaEstaDisponivel(especialista, data))) {
    throw new BadRequestError('Paciente não está disponível nesse horário')
  }

  const consulta = new Consulta()

  consulta.especialista = especialista
  consulta.paciente = paciente
  consulta.data = data
  consulta.desejaLembrete = desejaLembrete

  if (desejaLembrete === true) {
    consulta.lembretes = lembretes
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
    throw new NotFoundError('Consulta não encontrada')
  }
  // if (!consulta) {
  //   throw new NotFoundError("Consulta não encontrada");
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
    throw new NotFoundError('Consulta não encontrada')
  }

  const HORA = 60 * 24
  if (!validaAntecedenciaMinima(consulta.data, HORA)) {
    throw new BadRequestError(
      'A consulta deve ser desmarcada com 1 dia de antecedência'
    )
  }

  consulta.cancelar = motivo_cancelamento

  await AppDataSource.manager.delete(Consulta, { id })
  res.send('Consulta cancelada com sucesso')
}
