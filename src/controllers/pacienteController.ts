import { Request, Response } from 'express';
import { randomUUID } from 'crypto';

interface IPaciente {
    id: string;
    nome: string;
    email: string;
    senha: string; // Criptografia?
    endereco: {
        cep: number,
        rua: string,
        numero: number,
        complemento: string
    };
    telefone: number;
    possuiPlanoSaude: boolean;
    planoSaude: string; // Tipo certo?
}

const pacienteMemoria: IPaciente[] = [];

export const pacientes = async (req: Request, res: Response) => {
    res.json(pacienteMemoria);
}

export const pacientePost = async(req: Request, res: Response) => {
    const {nome, email, senha, endereco, telefone, possuiPlanoSaude, planoSaude} = req.body;
    const id = randomUUID();

    const paciente: IPaciente = {
        id, 
        nome, 
        email, 
        senha, 
        endereco, 
        telefone, 
        possuiPlanoSaude,
        planoSaude
    };
    pacienteMemoria.push(paciente);
    res.json(paciente);
}

export const pacienteGet = async(req: Request, res: Response) => {
    const {id} = req.params;
    const paciente = pacienteMemoria.find((paciente) => paciente.id === id);
    res.json(paciente);
}

export const pacienteDelete = async(req: Request, res: Response) => {
    const {id} = req.params;
    const pacienteIndex = pacienteMemoria.findIndex((paciente) => paciente.id === id);
    pacienteMemoria.splice(pacienteIndex, 1);
    res.json({message: 'Paciente apagado!'});
}

