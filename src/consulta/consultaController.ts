import { type Request, type Response } from 'express'
import { AppDataSource } from '../data-source'
import { Consulta } from './consultaEntity'
import { estaAtivoEspecialista, estaAtivoPaciente, validaAntecedenciaMinima, validaClinicaEstaAberta } from './consultaValidacoes'

export const criaConsulta = async (req: Request, res: Response): Promise<void> => {
  const {
    especialista,
    paciente,
    data,
    desejaLembrete,
    lembretes
  } = req.body

  if (!validaClinicaEstaAberta(data)) {
    throw new Error('A clinica não está aberta nesse horário')
  }

  if (!validaAntecedenciaMinima(data)) {
    throw new Error('A consulta deve ser agendada com 30 minutos de antecedência')
  }

  const situacaoPaciente = await estaAtivoPaciente(paciente)
  if (!situacaoPaciente) {
    throw new Error('Paciente não está ativo')
  }

  const situacaoEspecialista = await estaAtivoEspecialista(especialista)

  if (!situacaoEspecialista) {
    throw new Error('Especialista não está ativo')
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
  res.json(consulta)
}
export const listaConsultas = async (req: Request, res: Response): Promise<void> => {}
export const buscaConsultaPorId = async (req: Request, res: Response): Promise<void> => {}
export const deletaConsulta = async (req: Request, res: Response): Promise<void> => {}
