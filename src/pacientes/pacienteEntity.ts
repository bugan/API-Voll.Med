import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Relation,
  OneToMany
} from 'typeorm'
import { Endereco } from '../enderecos/enderecoEntity.js'
import { Avaliacoes } from '../avaliacoes/avaliacoesEntity.js'
import { type IAutenticavel } from '../auth/IAutencavel.js'
import { Role } from '../auth/roles.js'

@Entity()
export class Paciente implements IAutenticavel {
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

  @Column({ type: 'simple-array', nullable: true })
    historico: string

  @Column('varchar', { nullable: true })
    imagem: string

  @Column('varchar', { nullable: false })
    role: Role

  @OneToMany(() => Avaliacoes, (avaliacoes) => avaliacoes.paciente)
    avaliacoes: Relation<Avaliacoes>

  constructor (
    cpf,
    nome,
    email,
    senha,
    telefone,
    planosSaude,
    estaAtivo,
    imagem,
    historico
  ) {
    this.cpf = cpf
    this.nome = nome
    this.email = email
    this.estaAtivo = estaAtivo
    this.senha = senha
    this.telefone = telefone
    this.planosSaude = planosSaude
    this.imagem = imagem
    this.historico = historico
    this.role = Role.paciente
  }
}
