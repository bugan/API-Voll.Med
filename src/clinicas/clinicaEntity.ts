import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation
} from 'typeorm'
import { Endereco } from '../enderecos/enderecoEntity.js'
import { Especialista } from '../especialistas/EspecialistaEntity.js'
import { type IAutenticavel } from '../auth/IAutencavel.js'
import { Role } from '../auth/roles.js'

@Entity()
export class Clinica implements IAutenticavel {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @OneToOne(() => Endereco, {
    cascade: ['update']
  })
  @Column('varchar', { length: 100 })
    nome: string

  @JoinColumn({ referencedColumnName: 'id' })
    endereco: Relation<Endereco>

  @OneToMany(() => Especialista, (especialista) => especialista.clinica)
    especialistas: Relation<Especialista[]>

  @Column({ type: 'simple-array', nullable: true })
    planoDeSaudeAceitos: string[]

  @Column('varchar', { length: 100 })
    email: string

  @Column('varchar', { length: 100, select: false })
    senha: string

  @Column('varchar', { nullable: false, default: Role.clinica })
    role: Role
}
