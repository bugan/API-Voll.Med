
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm'
import { Especialista } from '../especialistas/EspecialistaEntity.js'
import { Paciente } from '../pacientes/pacienteEntity.js'

enum Lembrete {
  email,
  sms,
}

enum MotivoCancelamento {
  paciente_desistiu,
  médico_cancelou,
  outros
}

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @ManyToOne(() => Especialista, { eager: true })
    especialista: Especialista

  @ManyToOne(() => Paciente, { eager: true })
    paciente: Paciente

  @Column({ type: 'datetime', nullable: true })
    data: Date

  @Column({ type: 'boolean', default: false })
    desejaLembrete: boolean

  @Column({ type: 'simple-array', nullable: true })
    lembretes: string[]

  @Column({ name: 'motivo_cancelamento', nullable: true })
    motivoCancelamento: string

  cancelar (motivo: string): void {
    this.motivoCancelamento = motivo
  }
}
