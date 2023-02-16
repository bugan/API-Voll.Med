
import { type Request, type Response } from 'express'
import { Paciente } from './pacienteEntity.js'
import { AppDataSource } from '../data-source.js'
import { Endereco } from '../enderecos/enderecoEntity.js'
import { CPFValido } from './validacaoCPF.js'

export const lerPacientes = async (req: Request, res: Response): Promise<void> => {
  const tabelaPaciente = AppDataSource.getRepository(Paciente)
  const allPacientes = await tabelaPaciente.find()

  if (allPacientes.length == 0) {
    res.status(404).json('Não encontramos pacientes!')
  } else {
    res.status(200).json(allPacientes)
  }
}

export const criarPaciente= async (req: Request, res: Response): Promise<void> => {
  const {
    cpf,
    nome,
    email,
    senha,
    endereco,
    telefone,
    planoSaude
  } = req.body

  if (!CPFValido(cpf)) {
    throw new Error('CPF Inválido!')
  }

  try {
    const paciente = new Paciente(cpf, nome, email, senha, telefone, planoSaude)
  
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

export const atualizarPaciente = async (req: Request, res: Response): Promise<void> => {
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
      res.status(200).json(paciente)
    }

  } catch (error) {
    res.status(502).send('Paciente não foi atualizado!')
  }
}

export const deletarPaciente = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const paciente = await AppDataSource.manager.findOne(Paciente, {
    where: { id },
    relations: ['endereco']
  })

  if (paciente === null) {
    res.status(404).json('Paciente não encontrado!')
  } else {
    try {
      const endereco = paciente.endereco
      // Como fazer com o cascade?
      await AppDataSource.manager.remove(Paciente, paciente)
      await AppDataSource.manager.remove(Endereco, endereco)
      res.status(200).json({ message: 'Paciente apagado!' })
    } catch (error) {
      res.status(502).send('Paciente não foi apagado!')
    }
  }
}

export const atualizarEnderecoPaciente = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { cep, rua, numero, complemento} = req.body
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
