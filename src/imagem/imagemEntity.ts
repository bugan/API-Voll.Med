import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Imagem {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    nome: string

  @Column()
    tamanho: number

  @Column()
    url: string

  @Column()
    key: string
}
