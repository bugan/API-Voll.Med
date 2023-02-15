import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm'
import { Avaliacoes } from '../avaliacoes/avaliacoesEntity.js'

enum PlanosSaude {
  Sulamerica,
  Unimed,
  Bradesco,
  Amil,
  Biosaúde,
  Biovida,
  Outro
}

@Entity("especialista")
export class Especialista {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column('varchar', { length: 100 })
    nome: string

  @Column('varchar',{ length:50, unique:true })
    crm: string

  @Column('varchar', { length: 100, nullable: true})
    imagem: string

  @Column('varchar', { length: 100 })
    especialidade: string

  @Column('varchar', { length: 100, nullable:true })
    email: string

<<<<<<< HEAD
<<<<<<< HEAD
  @Column('varchar', { length: 50 })
    telefone: string
=======
  @Column('varchar', {nullable: true })
=======
  @Column('varchar', {length: 50, nullable: true })
>>>>>>> dc032a5 (feat: erro post crm duplicado)
    telefone: string;
>>>>>>> 7950a80 (fix: update)

<<<<<<< HEAD
  @OneToMany(() => Avaliacoes, (avaliacoes) => avaliacoes.especialista, {
    eager: true
  })
    avaliacoes: Relation<Avaliacoes>

  @Column({ type: 'enum', enum: PlanosSaude })
    planosSaude: PlanosSaude

  constructor (nome, crm, imagem, especialidade, email, telefone) {
    this.nome = nome
    this.crm = crm
    this.imagem = imagem
    this.especialidade = especialidade
    this.email = email
    this.telefone = telefone
  }
=======
 
   constructor(nome, crm, imagem, especialidade,email, telefone, ){
      this.nome = nome;
      this.crm = crm;
      this.imagem = imagem
      this.especialidade =especialidade
      this.email = email
      this.telefone = telefone
    }
>>>>>>> 81ea340 (update: middleware de erro)
}
