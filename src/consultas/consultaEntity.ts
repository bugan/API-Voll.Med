
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm'
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
  // @JoinColumn({ name: 'especialista_id' })
    especialista: Especialista

  @ManyToOne(() => Paciente, { eager: true })
  // @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente

  @Column({ type: 'datetime', nullable: true })
    data: Date

  @Column({ type: 'boolean', default: false })
    desejaLembrete: boolean

  @Column({ type: 'set', enum: Lembrete })
    lembretes?: Lembrete[]

  @Column({ name: 'motivo_cancelamento', nullable: true })
    motivoCancelamento: MotivoCancelamento

  cancelar (motivo: MotivoCancelamento): void {
    this.motivoCancelamento = motivo
  }
}
