import { type Request, type Response } from 'express'
import { Paciente } from './pacienteEntity.js'
import { AppDataSource } from '../data-source.js'
import { Endereco } from '../enderecos/enderecoEntity.js'

export const pacientes = async (req: Request, res: Response): Promise<void> => {
  const tabelaPaciente = AppDataSource.getRepository(Paciente)
  const allPacientes = await tabelaPaciente.find({
    relations: {
      endereco: true
    }
  })
  res.json(allPacientes)
}

export const pacientePost = async (req: Request, res: Response): Promise<void> => {
  const {
    nome,
    email,
    senha,
    endereco,
    telefone,
    estaAtivo,
    possuiPlanoSaude,
    planoSaude
  } = req.body

  const enderecoPaciente = new Endereco()
  enderecoPaciente.cep = endereco.cep
  enderecoPaciente.rua = endereco.rua
  enderecoPaciente.numero = endereco.numero
  enderecoPaciente.complemento = endereco.complemento

  const paciente = new Paciente(nome, email, enderecoPaciente)
  paciente.senha = senha
  paciente.telefone = telefone
  paciente.possuiPlanoSaude = possuiPlanoSaude
  paciente.planoSaude = planoSaude
  paciente.estaAtivo = estaAtivo

  await AppDataSource.manager.save(Endereco, enderecoPaciente)
  await AppDataSource.manager.save(Paciente, paciente)

  res.json(paciente)
}

export const pacienteGet = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    relations: ['endereco']
  })
  res.json(paciente)
}

export const pacienteUpdate = async (req: Request, res: Response): Promise<void> => {
  const {
    nome,
    email,
    senha,
    endereco,
    estaAtivo,
    telefone,
    possuiPlanoSaude,
    planoSaude
  } = req.body

  const { id } = req.params

  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    relations: ['endereco']
  })
  if (paciente !== null) {
    paciente.nome = nome
    paciente.email = email
    paciente.senha = senha
    paciente.estaAtivo = estaAtivo
    paciente.telefone = telefone
    paciente.possuiPlanoSaude = possuiPlanoSaude
    paciente.planoSaude = planoSaude
    paciente.endereco.cep = endereco.cep
    paciente.endereco.rua = endereco.rua
    paciente.endereco.numero = endereco.numero
    paciente.endereco.complemento = endereco.complemento

    await AppDataSource.manager.save(Paciente, paciente)
  }

  res.json(paciente)
}

// TODO nao deletar o paciente, mas torna-lo inativo
export const desativaPaciente = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id }
  })
  if (paciente !== null) {
    // await AppDataSource.manager.remove(Paciente, paciente)
    paciente.estaAtivo = false
    res.json({ message: 'Paciente desativado!' })
  }
}
