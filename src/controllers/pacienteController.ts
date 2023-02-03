import { type Request, type Response } from 'express'
import { randomUUID } from 'crypto'

interface IPaciente {
  id: string
  nome: string
  email: string
  senha: string // Criptografia?
  endereco: {
    cep: number
    rua: string
    numero: number
    complemento: string
  }
  telefone: number
  planoSaude: string // Tipo certo?
}

const pacienteMemoria: IPaciente[] = []

export const pacientes = async (req: Request, res: Response) => {
  res.json(pacienteMemoria)
}

export const pacientePost = async (req: Request, res: Response) => {
  const { nome, email, senha, endereco, telefone, planoSaude } = req.body
  const id = randomUUID()

  const paciente: IPaciente = {
    id,
    nome,
    email,
    senha,
    endereco,
    telefone,
    planoSaude
  }
  pacienteMemoria.push(paciente)
  res.json(paciente)
}

export const pacienteGet = async (req: Request, res: Response) => {
  const { id } = req.params
  const paciente = pacienteMemoria.find((paciente) => paciente.id === id)
  return res.json(paciente)
}
