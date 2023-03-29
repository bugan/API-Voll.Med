import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation, OneToMany } from 'typeorm'
import { Endereco } from '../enderecos/enderecoEntity.js'
import { Avaliacoes } from '../avaliacoes/avaliacoesEntity.js'

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column('varchar', { length: 11 })
    cpf: string

  @Column('varchar', { length: 100 })
    nome: string

  @Column('varchar', { length: 100 })
    email: string

  @Column('varchar', { length: 100, select: false })
    senha: string // Criptografia?

  @OneToOne(() => Endereco, {
    cascade: ['update']
  })
  @JoinColumn({ referencedColumnName: 'id' })
    endereco: Relation<Endereco>

  @Column({ type: 'int' })
    telefone: number

  @Column({ type: 'boolean', default: true })
    estaAtivo: boolean

  @Column({ type: 'boolean', default: true })
    possuiPlanoSaude: boolean

  @Column({ type: 'simple-array', nullable: true })
    planosSaude: string

  @OneToMany(() => Avaliacoes, (avaliacoes) => avaliacoes.paciente)
    avaliacoes: Relation<Avaliacoes>

  constructor (cpf, nome, email, senha, telefone, planosSaude, estaAtivo) {
    this.cpf = cpf
    this.nome = nome
    this.email = email
    this.estaAtivo = estaAtivo
    this.senha = senha
    this.telefone = telefone
    this.planosSaude = planosSaude
  }
}
