import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Relation } from 'typeorm'
import { Paciente } from '../pacientes/pacienteEntity.js'
import { Especialista } from '../especialistas/EspecialistaEntity.js'

@Entity()
export class Avaliacoes {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @CreateDateColumn({
    type: 'timestamp'
  })
    createdAt!: Date // Gerar automaticamente e puxar no GET o horário no CRUD

  @ManyToOne(() => Especialista, (especialista) => especialista.avaliacoes)
    especialista: Relation<Especialista>

  @ManyToOne(() => Paciente, (paciente) => paciente.avaliacoes)
    paciente: Relation<Paciente>

  @Column({ type: 'int' })
    nota: number

  @Column({ nullable: true })
    especialistaId: string

  @Column({ nullable: true })
    pacienteId: number
}
