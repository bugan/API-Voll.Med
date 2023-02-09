
import { type Request, type Response } from 'express'
import { Paciente } from './pacienteEntity.js'
import { AppDataSource } from '../data-source.js'
import { Endereco } from '../enderecos/enderecoEntity.js'

export const pacientes = async (req: Request, res: Response): Promise<void> => {
  const tabelaPaciente = AppDataSource.getRepository(Paciente)
  const allPacientes = await tabelaPaciente.find({
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      planoSaude: true
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
  paciente.planoSaude = planoSaude

  await AppDataSource.manager.save(Endereco, enderecoPaciente)
  await AppDataSource.manager.save(Paciente, paciente)

  res.json(paciente)
}

export const pacienteGet = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      planoSaude: true
    },
    relations: {
      endereco: true
    }
  })
  res.json(paciente)
}

export const pacienteUpdate = async (req: Request, res: Response): Promise<void> => {
  const {
    nome,
    email,
    senha,
    endereco,
    telefone,
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
    paciente.telefone = telefone
    paciente.planoSaude = planoSaude
    paciente.endereco.cep = endereco.cep
    paciente.endereco.rua = endereco.rua
    paciente.endereco.numero = endereco.numero
    paciente.endereco.complemento = endereco.complemento

    await AppDataSource.manager.save(Paciente, paciente)
  }

  res.json(paciente)
}

export const pacienteDelete = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    relations: ['endereco']
  })
  if (paciente !== null) {
    const endereco = paciente.endereco
    // Como fazer com o cascade?
    await AppDataSource.manager.remove(Paciente, paciente)
    await AppDataSource.manager.remove(Endereco, endereco)
    res.json({ message: 'Paciente apagado!' })
  }
}
