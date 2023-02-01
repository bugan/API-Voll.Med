import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

enum planosSaude {
    Sulamerica,
    Unimed,
    Bradesco,
    Amil,
    Biosaúde,
    Biovida,
    Outro
}

@Entity()
export class Paciente {
    @PrimaryGeneratedColumn()
    id: string

    @Column("varchar", {length: 100})
    nome: string

    @Column("varchar", {length: 100})
    email: string

    @Column("varchar", {length: 100})
    senha: string // Criptografia?

    // Endereço
    @Column({type: "int"})
    cep: number

    @Column("varchar", {length: 50})
    rua: string

    @Column({type: "int"})
    numero: number

    @Column("varchar", {length: 100})
    complemento: string


    @Column({type: "int"})
    telefone: number

    @Column({type: "boolean"})
    possuiPlanoSaude: boolean

    @Column({type: "enum", enum: planosSaude})
    planoSaude: planosSaude 
}