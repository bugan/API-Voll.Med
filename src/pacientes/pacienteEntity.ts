
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation, OneToMany } from 'typeorm'
import { Endereco } from '../enderecos/enderecoEntity.js'
import { Avaliacoes } from '../avaliacoes/avaliacoesEntity.js'

enum planosSaude {
  Sulamerica,
  Unimed,
  Bradesco,
  Amil,
  Biosaude,
  Biovida,
  Outro
}

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
    id: string

  @Column('varchar', { length: 100 })
    nome: string

  @Column('varchar', { length: 100 })
    email: string

  @Column('varchar', { length: 100 })
    senha: string // Criptografia?

  @OneToOne(() => Endereco, {
    cascade: ['update']
  })
  @JoinColumn({ referencedColumnName: 'id' })
    endereco: Relation<Endereco>

  @Column({ type: 'int' })
    telefone: number

  @Column({ type: 'boolean' })
    possuiPlanoSaude: boolean

  @Column({ type: 'enum', enum: planosSaude })
    planoSaude: planosSaude

  @OneToMany(() => Avaliacoes, (avaliacoes) => avaliacoes.paciente)
    avaliacoes: Relation<Avaliacoes>

  constructor (nome, email, endereco) {
    this.nome = nome
    this.email = email
    this.endereco = endereco
  }
}
