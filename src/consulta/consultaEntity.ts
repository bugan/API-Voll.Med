
// import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
// import { Especialista } from '../especialistas/EspecialistaEntidade.js'
// import { Paciente } from '../pacientes/pacienteEntity.js'

// @Entity()
// export class Consulta {
//   @PrimaryGeneratedColumn('uuid')
//     id: string

//   @ManyToOne(() => Paciente, (paciente) => paciente.agendamentos)

//   @ManyToOne(() => Especialista, (especialista) => especialista.agendamentos)

//   @Column()
//     date: Date

// //   // Para um array de enums, a documentação recomenda usar o tipo 'set' (https://dev.mysql.com/doc/refman/5.7/en/set.html)
//   @Column({ type: 'set', enum: Lembrete })
//     lembretes: Lembrete[]
// }

import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm'
import { Especialista } from '../especialistas/EspecialistaEntidade'
import { Paciente } from '../pacientes/pacienteEntity'

enum Lembrete {
  email,
  sms,
}
@Entity('consultas')
export class Consulta {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => Especialista, { eager: true })
  @JoinColumn({ name: 'especialista_id' })
    especialista: Especialista

  @ManyToOne(() => Paciente, { eager: true })
  @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente

  @Column({ type: 'datetime' })
    data: Date

  @Column({ type: 'boolean', default: false })
    desejaLembrete: boolean

  @Column({ type: 'set', enum: Lembrete })
    lembretes?: Lembrete[]

  // TODO
  // @Column({ name: 'motivo_cancelamento', nullable: true })
  //   motivoCancelamento: MotivoCancelamento

  // cancelar (motivo: MotivoCancelamento): void {
  //   this.motivoCancelamento = motivo
  // }
}
