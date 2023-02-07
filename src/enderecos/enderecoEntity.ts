import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
    id: string

  @Column({ type: 'int' })
    cep: number

  @Column('varchar', { length: 50 })
    rua: string

  @Column({ type: 'int' })
    numero: number

  @Column('varchar', { length: 100 })
    complemento: string

}