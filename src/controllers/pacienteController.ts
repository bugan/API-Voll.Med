import { type Request, type Response } from 'express'
import { Paciente } from '../entity/pacienteEntity.js'
import { AppDataSource } from '../data-source.js'
import { Endereco } from '../entity/enderecoEntity.js'

export const pacientes = async (req: Request, res: Response) => {
  const tabelaPaciente = await AppDataSource.getRepository(Paciente)
  const allPacientes = await tabelaPaciente.find({
    relations: {
      endereco: true
    }
  })
  res.json(allPacientes)
}

export const pacientePost = async (req: Request, res: Response) => {
  const {
    nome,
    email,
    senha,
    endereco,
    telefone,
    possuiPlanoSaude,
    planoSaude
  } = req.body

  const enderecoPaciente = new Endereco()
  enderecoPaciente.cep = endereco.cep
  enderecoPaciente.rua = endereco.rua
  enderecoPaciente.numero = endereco.numero
  enderecoPaciente.complemento = endereco.complemento

  const paciente = new Paciente()
  paciente.nome = nome
  paciente.email = email
  paciente.senha = senha
  paciente.endereco = enderecoPaciente
  paciente.telefone = telefone
  paciente.possuiPlanoSaude = possuiPlanoSaude
  paciente.planoSaude = planoSaude

  await AppDataSource.manager.save(Endereco, enderecoPaciente)
  await AppDataSource.manager.save(Paciente, paciente)

  res.json(paciente)
}

export const pacienteGet = async (req: Request, res: Response) => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    relations: ['endereco']
  })
  res.json(paciente)
}

export const pacienteUpdate = async (req: Request, res: Response) => {
  const {
    nome,
    email,
    senha,
    endereco,
    telefone,
    possuiPlanoSaude,
    planoSaude
  } = req.body

  const { id } = req.params

  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    relations: ['endereco']
  })

  paciente.nome = nome
  paciente.email = email
  paciente.senha = senha
  paciente.telefone = telefone
  paciente.possuiPlanoSaude = possuiPlanoSaude
  paciente.planoSaude = planoSaude
  paciente.endereco.cep = endereco.cep
  paciente.endereco.rua = endereco.rua
  paciente.endereco.numero = endereco.numero
  paciente.endereco.complemento = endereco.complemento

  await AppDataSource.manager.save(Paciente, paciente)

  res.json(paciente)
}

export const pacienteDelete = async (req: Request, res: Response) => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    relations: ['endereco']
  })
  const endereco = paciente.endereco

  // Como fazer com o cascade?
  await AppDataSource.manager.remove(Paciente, paciente)
  await AppDataSource.manager.remove(Endereco, endereco)
  res.json({ message: 'Paciente apagado!' })
}
