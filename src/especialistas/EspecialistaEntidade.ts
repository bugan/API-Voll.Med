import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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

  @Column('varchar', {length: 50, nullable: true })
    telefone: string;

  @OneToMany(() => Avaliacoes, (avaliacoes) => avaliacoes.especialista, {
    eager: true
  })
    avaliacoes: Relation<Avaliacoes>

  @Column({ type: 'enum', enum: PlanosSaude })
    planosSaude: PlanosSaude

 
   constructor(nome, crm, imagem, especialidade,email, telefone, ){
      this.nome = nome;
      this.crm = crm;
      this.imagem = imagem
      this.especialidade = especialidade
      this.email = email
      this.telefone = telefone
    }
}

