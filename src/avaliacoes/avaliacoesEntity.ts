// {
//     "id": 1,
//     "data": "2023-04-01T03:00:00.000Z",
//     "horario": "10:30",
//     "profissional":
//         {
//             "id":1,
//             "nome": "Ana Luiza",
//             "especialidade": "Clínico Geral"
//         }
//     ,
//     "paciente":{
//       id:"2",
//       "nome":"Guilherme Lima"
//     },
//     "nota": 4.5
// }
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation } from 'typeorm'
import { Paciente } from '../pacientes/pacienteEntity.js'
import { Especialista } from '../especialistas/EspecialistaEntidade.js'

@Entity()
export class Avaliacoes {
  @PrimaryGeneratedColumn()
    id: string

  @Column('varchar', { length: 100 })
    data: string

  @Column('varchar', { length: 100 })
    horario: string

  @Column('varchar', { length: 100 })
    senha: string // Criptografia?

  @OneToOne(() => Especialista, {
    cascade: ['update']
  })
  @JoinColumn({ referencedColumnName: 'id' })
    especialista: Relation<Especialista>

  @OneToOne(() => Paciente, {
    cascade: ['update']
  })
  @JoinColumn({ referencedColumnName: 'id' })
    paciente: Relation<Paciente>

  @Column({ type: 'int' })
    nota: number
}
