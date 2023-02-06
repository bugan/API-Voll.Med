import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

// falta endereço, objeto?

enum planosSaude {
  Sulamerica,
  Unimed,
  Bradesco,
  Amil,
  Biosaúde,
  Biovida,
  Outro
}

@Entity()
export class Especialista {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column('varchar', { length: 100 })
    nome: string

  @Column('varchar', { length: 100 })
    crm: string

  @Column('varchar')
    imagem: string

  @Column('varchar', { length: 100 })
    especialidade: string

  @Column('varchar', { length: 100 })
    email: string

  @Column('varchar', { length: 50 })
    telefone: string

  @Column({ type: 'int' })
    nota: number

  @Column({ type: 'enum', enum: planosSaude })
    planosSaude: planosSaude
}
