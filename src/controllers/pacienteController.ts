import { Request, Response } from 'express';
import { Paciente } from '../entity/pacienteEntity.js';
import { AppDataSource } from '../data-source.js';

export const pacientes = async (req: Request, res: Response) => {
    const allPacientes = await AppDataSource.manager.find(Paciente)
    res.json(allPacientes)
}

export const pacientePost = async(req: Request, res: Response) => {
    const {nome,
           email, 
           senha, 
           cep, 
           rua, 
           numero,
           complemento,
           telefone, 
           possuiPlanoSaude,
           planoSaude} = req.body;

    const paciente = new Paciente()
    paciente.nome = nome
    paciente.email = email
    paciente.senha = senha
    paciente.cep = cep
    paciente.rua = rua
    paciente.numero = numero
    paciente.complemento = complemento
    paciente.telefone = telefone
    paciente.possuiPlanoSaude = possuiPlanoSaude
    paciente.planoSaude = planoSaude

    await AppDataSource.manager.save(paciente)
    res.json(paciente);
}

export const pacienteGet = async(req: Request, res: Response) => {
    const {id} = req.params;
    const paciente = await AppDataSource.manager.findOneBy(Paciente, {
        id: id
    })
    res.json(paciente);
}

export const pacienteUpdate = async(req: Request, res: Response) => {
    const {id,
        nome,
        email, 
        senha, 
        cep, 
        rua, 
        numero,
        complemento,
        telefone, 
        possuiPlanoSaude,
        planoSaude} = req.body;

    const paciente = await AppDataSource.manager.findOneBy(Paciente, {
        id:id
    })

    paciente.nome = nome
    paciente.email = email
    paciente.senha = senha
    paciente.cep = cep
    paciente.rua = rua
    paciente.numero = numero
    paciente.complemento = complemento
    paciente.telefone = telefone
    paciente.possuiPlanoSaude = possuiPlanoSaude
    paciente.planoSaude = planoSaude

    await AppDataSource.manager.save(Paciente, paciente)
    res.json(paciente);
}

export const pacienteDelete = async(req: Request, res: Response) => {
    const {id} = req.params;
    const pacienteIndex = await AppDataSource.manager.findOneBy(Paciente, {
        id: id
    })
    await AppDataSource.manager.remove(Paciente, pacienteIndex)
    res.json({message: 'Paciente apagado!'});
}
