
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Endereco } from '../enderecos/enderecoEntity.js'
import { Especialista } from '../especialistas/EspecialistaEntity.js'

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
export class Clinica {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @OneToOne(() => Endereco, {
    cascade: ['update']
  })

  @JoinColumn({ referencedColumnName: 'id' })
    endereco: Relation<Endereco>

  @OneToMany(() => Especialista, (especialista) => especialista.clinica)
    especialistas: Relation<Especialista[]>

  // Para um array de enums, a documentação recomenda usar o tipo 'set' (https://dev.mysql.com/doc/refman/5.7/en/set.html)
  @Column({ type: 'set', enum: planosSaude })
    planoDeSaudeAceitos: planosSaude[]
}
