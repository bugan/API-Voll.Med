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
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Relation } from 'typeorm'
import { Paciente } from '../pacientes/pacienteEntity.js'
import { Especialista } from '../especialistas/EspecialistaEntidade.js'

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
