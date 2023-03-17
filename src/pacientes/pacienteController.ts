import { type Request, type Response } from 'express'
import { Paciente } from './pacienteEntity.js'
import { AppDataSource } from '../data-source.js'
import { Endereco } from '../enderecos/enderecoEntity.js'
import { CPFValido } from './validacaoCPF.js'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

export const lerPacientes = async (req: Request, res: Response): Promise<void> => {
  const tabelaPaciente = AppDataSource.getRepository(Paciente)
  const allPacientes = await tabelaPaciente.find()

  if (allPacientes.length === 0) {
    res.status(404).json('Não encontramos pacientes!')
  } else {
    res.status(200).json(allPacientes)
  }
}

export const criarPaciente = async (req: Request, res: Response): Promise<void> => {
  const {
    cpf,
    nome,
    email,
    senha,
    estaAtivo,
    possuiPlanoSaude,
    endereco,
    telefone,
    planoSaude
  } = req.body

  if (!CPFValido(cpf)) {
    throw new Error('CPF Inválido!')
  }

  try {
    const paciente = new Paciente(cpf, nome, email, senha, telefone, planoSaude, estaAtivo)
    paciente.possuiPlanoSaude = possuiPlanoSaude
    const enderecoPaciente = new Endereco()

    if (endereco !== undefined) {
      enderecoPaciente.cep = endereco.cep
      enderecoPaciente.rua = endereco.rua
      enderecoPaciente.numero = endereco.numero
      enderecoPaciente.complemento = endereco.complemento

      paciente.endereco = enderecoPaciente

      await AppDataSource.manager.save(Endereco, enderecoPaciente)
    }

    await AppDataSource.manager.save(Paciente, paciente)

    res.status(202).json(paciente)
  } catch (error) {
    res.status(502).send('Paciente não foi criado')
  }
}

export const lerPaciente = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    relations: {
      endereco: true
    }
  })

  if (paciente === null) {
    res.status(404).json('Paciente não encontrado!')
  } else {
    res.status(200).json(paciente)
  }
}

// update
export const atualizarPaciente = async (req: Request, res: Response): Promise<void> => {
  const {
    nome,
    email,
    senha,
    estaAtivo,
    telefone,
    possuiPlanoSaude,
    planoSaude,
    cpf
  } = req.body

  const { id } = req.params

  if (!CPFValido(cpf)) {
    throw new Error('CPF Inválido!')
  }

  try {
    const paciente = await AppDataSource.manager.findOne(Paciente, {
      where: { id },
      relations: ['endereco']
    })

    if (paciente === null) {
      res.status(404).json('Paciente não encontrado!')
    } else {
      paciente.cpf = cpf
      paciente.nome = nome
      paciente.email = email
      paciente.senha = senha
      paciente.possuiPlanoSaude = possuiPlanoSaude
      paciente.telefone = telefone
      paciente.planoSaude = planoSaude
      paciente.estaAtivo = estaAtivo

      await AppDataSource.manager.save(Paciente, paciente)
      res.status(200).json(paciente)
    }
  } catch (error) {
    res.status(502).send('Paciente não foi atualizado!')
  }
}

export const atualizarEnderecoPaciente = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { cep, rua, numero, complemento } = req.body
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    relations: ['endereco']
  })

  if (paciente === null) {
    res.status(404).json('Paciente não encontrado!')
  } else {
    if (paciente.endereco === null) {
      const endereco = new Endereco()
      endereco.cep = cep
      endereco.rua = rua
      endereco.numero = numero
      endereco.complemento = complemento

      paciente.endereco = endereco

      await AppDataSource.manager.save(Endereco, endereco)
    } else {
      paciente.endereco.cep = cep
      paciente.endereco.rua = rua
      paciente.endereco.numero = numero
      paciente.endereco.complemento = complemento
    }

    await AppDataSource.manager.save(Paciente, paciente)

    res.status(200).json(paciente)
  }
}

// TODO nao deletar o paciente, mas torna-lo inativo
export const desativaPaciente = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id }
  })
  if (paciente !== null) {
    paciente.estaAtivo = false
    res.json({
      message:

      'Paciente desativado!'
    })
  }
}
export const loginPaciente = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { email, senha }
  })

  if (paciente == null) {
    res.status(500).json({ message: 'Login inválido!' })
  } else {
    const id = paciente.id
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 86400 }) // expira em 24 horas
    res.status(200).json({ auth: true, token })
  }
}

export const logoutPaciente = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ auth: false, token: null })
}
