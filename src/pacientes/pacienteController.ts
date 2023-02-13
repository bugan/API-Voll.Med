
import { type Request, type Response } from 'express'
import { Paciente } from './pacienteEntity.js'
import { AppDataSource } from '../data-source.js'
import { Endereco } from '../enderecos/enderecoEntity.js'

export const pacientes = async (req: Request, res: Response): Promise<void> => {
  const tabelaPaciente = AppDataSource.getRepository(Paciente)
  const allPacientes = await tabelaPaciente.find({
    select: {
      id: true,
      cpf: true,
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
    cpf,
    nome,
    email,
    senha,
    endereco,
    telefone,
    planoSaude
  } = req.body

  if (!validaCpf(cpf)) {
    throw new Error('CPF Inválido!')
  }

  const paciente = new Paciente(nome, email, cpf)
  paciente.senha = senha
  paciente.telefone = telefone
  paciente.planoSaude = planoSaude

  const enderecoPaciente = new Endereco()

  if(endereco !== undefined) {
    enderecoPaciente.cep = endereco.cep
    enderecoPaciente.rua = endereco.rua
    enderecoPaciente.numero = endereco.numero
    enderecoPaciente.complemento = endereco.complemento

    paciente.endereco = enderecoPaciente

    await AppDataSource.manager.save(Endereco, enderecoPaciente)
  }

  await AppDataSource.manager.save(Paciente, paciente)

  res.json(paciente)
}

export const pacienteGet = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    select: {
      id: true,
      cpf: true,
      nome: true,
      email: true,
      telefone: true,
      planoSaude: true
    },
    relations: {
      endereco: true
    }
  })

  if (paciente === null) {
    throw new Error('Paciente não encontrado!')
  }

  res.json(paciente)
}

export const pacienteUpdate = async (req: Request, res: Response): Promise<void> => {
  const {
    cpf,
    nome,
    email,
    senha,
    endereco,
    telefone,
    planoSaude
  } = req.body

  const { id } = req.params

  if (!validaCpf(cpf)) {
    throw new Error('CPF Inválido!')
  }

  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    relations: ['endereco']
  })
  if (paciente !== null) {
    paciente.cpf = cpf
    paciente.nome = nome
    paciente.email = email
    paciente.senha = senha
    paciente.telefone = telefone
    paciente.planoSaude = planoSaude

    if (paciente.endereco === null) {
      const enderecoPaciente = new Endereco()
      enderecoPaciente.cep = endereco.cep
      enderecoPaciente.rua = endereco.rua
      enderecoPaciente.numero = endereco.numero
      enderecoPaciente.complemento = endereco.complemento

      paciente.endereco = enderecoPaciente

      await AppDataSource.manager.save(Endereco, enderecoPaciente)
      
    } else {
      paciente.endereco.cep = endereco.cep
      paciente.endereco.rua = endereco.rua
      paciente.endereco.numero = endereco.numero
      paciente.endereco.complemento = endereco.complemento
    }

    await AppDataSource.manager.save(Paciente, paciente)
  } else {
    throw new Error('Paciente não encontrado!')
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
  } else {
    throw new Error('Paciente não encontrado!')
  }
}

export const pacienteEnderecoPatch = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { cep, rua, numero, complemento} = req.body
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    relations: ['endereco']
  })

  if (paciente !== null) {
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
  } else {
    throw new Error('Paciente não encontrado!')
  }

  res.json(paciente)
}

const cpfsInvalidos = ['00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999']

function validaCpf (cpf: string): boolean {
  let soma: number = 0
  let resto: number = 0

  if (cpf.length !== 11) {
    console.log('tamanho')
    return false
  }

  if (cpf in cpfsInvalidos) {
    return false
  }

  // Validação dos últimos dígitos
  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }

  resto = (soma * 10) % 11

  if ((resto === 10) || (resto === 11)) {
    resto = 0
  }

  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false
  }

  soma = 0
  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }

  resto = (soma * 10) % 11

  if ((resto === 10) || (resto === 11)) {
    resto = 0
  }

  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false
  }
  return true
}
