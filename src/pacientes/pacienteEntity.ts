
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation } from 'typeorm'
import { Endereco } from '../enderecos/enderecoEntity.js'

enum planosSaude {
  Sulamerica,
  Unimed,
  Bradesco,
  Amil,
  Biosaude,
  Biovida,
  Outro
}

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
    id: string

  @Column('varchar', { length: 100 })
    nome: string

  @Column('varchar', { length: 100 })
    email: string

  @Column('varchar', { length: 100 })
    senha: string // Criptografia?

  @OneToOne(() => Endereco, {
    cascade: ['update']
  })
  @JoinColumn({ referencedColumnName: 'id' })
    endereco: Relation<Endereco>

  @Column({ type: 'int' })
    telefone: number

  @Column({ type: 'boolean' })
    possuiPlanoSaude: boolean

  @Column({ type: 'enum', enum: planosSaude })
    planoSaude: planosSaude

    constructor(nome, email, endereco){
      this.nome = nome;
      this.email = email;
      this.endereco = endereco;
      console.log(endereco);
    }
}
