import { type Request, type Response } from 'express'
import { Paciente } from './pacienteEntity.js'
import { AppDataSource } from '../data-source.js'
import { Endereco } from '../enderecos/enderecoEntity.js'
import { CPFValido } from './validacaoCPF.js'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { mapeiaPlano } from '../utils/planoSaudeUtils.js'
import { BadRequestError } from '../apiError/api-error.js'
import { Consulta } from '../consultas/consultaEntity.js'
dotenv.config()

export const criarPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {
  let {
    cpf,
    nome,
    email,
    senha,
    estaAtivo,
    possuiPlanoSaude,
    endereco,
    telefone,
    planosSaude,
    imagem,
    historico
  } = req.body

  if (!CPFValido(cpf)) {
    throw new BadRequestError('CPF Inválido!')
  }

  if (possuiPlanoSaude === true && planosSaude !== undefined) {
    // transforma array de numbers em array de strings com os nomes dos planos definidos no enum correspondente
    planosSaude = mapeiaPlano(planosSaude)
  }

  try {
    const paciente = new Paciente(
      cpf,
      nome,
      email,
      senha,
      telefone,
      planosSaude,
      estaAtivo,
      imagem,
      historico
    )
    paciente.possuiPlanoSaude = possuiPlanoSaude
    const enderecoPaciente = new Endereco()

    if (endereco !== undefined) {
      enderecoPaciente.cep = endereco.cep
      enderecoPaciente.rua = endereco.rua
      enderecoPaciente.estado = endereco.estado
      enderecoPaciente.numero = endereco.numero
      enderecoPaciente.complemento = endereco.complemento

      paciente.endereco = enderecoPaciente

      await AppDataSource.manager.save(Endereco, enderecoPaciente)
    }

    await AppDataSource.manager.save(Paciente, paciente)

    res.status(202).json(paciente)
  } catch (error) {
    res.status(502).json({ 'Paciente não foi criado': error })
  }
}
export const lerPacientes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const tabelaPaciente = AppDataSource.getRepository(Paciente)
  const allPacientes = await tabelaPaciente.find()

  if (allPacientes.length === 0) {
    res.status(404).json('Não encontramos pacientes!')
  } else {
    res.status(200).json(allPacientes)
  }
}

export const lerPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const listaConsultasPaciente = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id }
  })
  if (paciente == null) {
    throw new BadRequestError('Paciente não encontrado!')
  }
  const consultas = await AppDataSource.manager.find(Consulta, {
    where: { paciente: { id: paciente.id } }
  })

  const consultadasTratadas = consultas.map((consulta) => {
    return {
      id: consulta.id,
      data: consulta.data,
      desejaLembrete: consulta.desejaLembrete,
      lembretes: consulta.lembretes,
      especialista: consulta.especialista
    }
  })

  return res.json(consultadasTratadas)
}

// update
export const atualizarPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {
  let {
    nome,
    email,
    senha,
    estaAtivo,
    telefone,
    possuiPlanoSaude,
    planosSaude,
    cpf,
    imagem,
    historico
  } = req.body

  const { id } = req.params

  if (!CPFValido(cpf)) {
    throw new Error('CPF Inválido!')
  }

  if (possuiPlanoSaude === true && planosSaude !== undefined) {
    // transforma array de numbers em array de strings com os nomes dos planos definidos no enum correspondente
    planosSaude = mapeiaPlano(planosSaude)
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
      paciente.planosSaude = planosSaude
      paciente.estaAtivo = estaAtivo
      paciente.imagem = imagem
      paciente.historico = historico

      await AppDataSource.manager.save(Paciente, paciente)
      res.status(200).json(paciente)
    }
  } catch (error) {
    res.status(502).send('Paciente não foi atualizado!')
  }
}

export const atualizarEnderecoPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { cep, rua, numero, estado, complemento } = req.body
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
      endereco.estado = estado
      endereco.numero = numero
      endereco.complemento = complemento

      paciente.endereco = endereco

      await AppDataSource.manager.save(Endereco, endereco)
    } else {
      paciente.endereco.cep = cep
      paciente.endereco.rua = rua
      paciente.endereco.estado = estado
      paciente.endereco.numero = numero
      paciente.endereco.complemento = complemento
    }

    await AppDataSource.manager.save(Paciente, paciente)

    res.status(200).json(paciente)
  }
}

// Não deleta o paciente, fica inativo
export const desativaPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id }
  })
  if (paciente !== null) {
    paciente.estaAtivo = false
    res.json({
      message: 'Paciente desativado!'
    })
  }
}
export const loginPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const logoutPaciente = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({ auth: false, token: null })
}
