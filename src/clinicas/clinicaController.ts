
import { type Request, type Response } from 'express'
import { AppDataSource } from '../data-source.js'
import { Endereco } from '../enderecos/enderecoEntity.js'
import { Especialista } from '../especialistas/EspecialistaEntity.js'
import { Clinica } from './clinicaEntity.js'

export const criarClinica = async (req: Request, res: Response): Promise<void> => {
  const {
    endereco,
    planoDeSaudeAceitos
  } = req.body

  const clinica = new Clinica()

  const enderecoClinica = new Endereco()
  enderecoClinica.cep = endereco.cep
  enderecoClinica.rua = endereco.rua
  enderecoClinica.numero = endereco.numero
  enderecoClinica.complemento = endereco.complemento

  await AppDataSource.manager.save(Endereco, enderecoClinica)

  clinica.endereco = enderecoClinica
  clinica.planoDeSaudeAceitos = planoDeSaudeAceitos

  await AppDataSource.manager.save(Clinica, clinica)
  res.json(clinica)
}

export const listarClinicas = async (req: Request, res: Response): Promise<void> => {
  const clinicaRepositorio = AppDataSource.getRepository(Clinica)
  const clinicas = await clinicaRepositorio.find()
  res.json(clinicas)
}

export const buscarClinica = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const clinica = await AppDataSource.manager.findOne(Clinica, {
    where: { id },
    relations: ['endereco', 'especialista']
  })
  res.json(clinica)
}

export const atualizarClinica = async (req: Request, res: Response): Promise<void> => {
  const {
    endereco,
    planoDeSaudeAceitos
  } = req.body

  const { id } = req.params

  const clinica = await AppDataSource.manager.findOne(Clinica, {
    where: { id },
    relations: ['endereco']
  })
  if (clinica !== null) {
    clinica.planoDeSaudeAceitos = planoDeSaudeAceitos
    clinica.endereco.cep = endereco.cep
    clinica.endereco.rua = endereco.rua
    clinica.endereco.numero = endereco.numero
    clinica.endereco.complemento = endereco.complemento

    await AppDataSource.manager.save(Clinica, clinica)
  }

  res.json(clinica)
}

export const listaEspecialistasPorClinica = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const clinica = await AppDataSource.manager.findOne(Clinica, {
    where: { id },
    relations: ['especialistas']
  })
  if (clinica == null) return res.status(404).json({ message: 'Clinica não encontrada' })

  const especialistasDaClinica = clinica.especialistas
  return res.json(especialistasDaClinica)
}

export const atualizaEspecialistaPeloIdDaClinica = async (req: Request, res: Response): Promise<Response> => {
  //! Não consegui pegar o especialistaId pelo req.params
  // const { id, especialistaId } = req.params
  const { id } = req.params
  const { especialistaId } = req.body

  // buscando especialista do id especificado
  const especialista = await AppDataSource.manager.findOne(Especialista, {
    where: { id: especialistaId }
  })
  if (especialista == null) { return res.status(404).json({ message: 'Especialista não encontrado' }) }

  // buscando clinica do id especificado
  const clinica = await AppDataSource.manager.findOne(Clinica, {
    where: { id }
  })
  if (clinica == null) { return res.status(404).json({ message: 'Clinica não encontrada' }) }

  // atualizando clinica do especialista e salvando
  especialista.clinica = clinica
  await AppDataSource.manager.save(especialista)
  return res.json(especialista)
}

export const deletarClinica = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const clinica = await AppDataSource.manager.findOne(Clinica, {
    where: { id },
    relations: ['endereco']
  })
  if (clinica !== null) {
    const endereco = clinica.endereco
    await AppDataSource.manager.remove(Clinica, clinica)
    await AppDataSource.manager.remove(Endereco, endereco)
    res.json({ message: 'Clinica apagada!' })
  }
}
