import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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
    telefone: string;

  @Column({ type: 'int' })
    nota: number;

   constructor(nome, crm, imagem, especialidade,email, telefone, nota){
      this.nome = nome;
      this.crm = crm;
      this.imagem = imagem
      this.especialidade =especialidade
      this.email = email
      this.telefone = telefone
      this.nota = nota
    }
}

