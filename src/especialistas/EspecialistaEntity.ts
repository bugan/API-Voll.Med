import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Avaliacoes } from "../avaliacoes/avaliacoesEntity.js";
import { Clinica } from "../clinicas/clinicaEntity.js";
import { Endereco } from "../enderecos/enderecoEntity.js";
import { type IAutenticavel } from "../auth/IAutencavel.js";
import { Role } from "../auth/roles.js";

@Entity()
export class Especialista implements IAutenticavel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 100 })
  nome: string;

  @Column("varchar", { length: 100 })
  crm: string;

  @Column("varchar")
  imagem: string;

  @Column({ type: "boolean", default: true })
  estaAtivo: boolean;

  @Column("varchar", { length: 100 })
  especialidade: string;

  @Column("varchar", { length: 100, nullable: true })
  email: string;

  @Column("varchar", { length: 100, select: false })
  senha: string;  

  @Column("varchar", { nullable: true })
  telefone: string;

  @ManyToOne(() => Clinica, (clinica) => clinica.especialistas)
  clinica: Relation<Clinica>;

  @OneToMany(() => Avaliacoes, (avaliacoes) => avaliacoes.especialista, {
    eager: true,
  })
  avaliacoes: Relation<Avaliacoes>;

  @Column({ type: "boolean", default: true })
  possuiPlanoSaude: boolean;

  @Column({ type: "simple-array", nullable: true })
  planosSaude: string;

  @OneToOne(() => Endereco, {
    cascade: ["update"],
  })
  @JoinColumn({ referencedColumnName: "id" })
  endereco: Relation<Endereco>;

  @Column("varchar", { nullable: false })
  role: Role;

  constructor(
    nome,
    crm,
    imagem,
    estaAtivo,
    especialidade,
    email,
    telefone,
    possuiPlanoSaude,
    planosSaude,
    senha
  ) {
    this.nome = nome;
    this.crm = crm;
    this.imagem = imagem;
    this.estaAtivo = estaAtivo;
    this.especialidade = especialidade;
    this.email = email;
    this.telefone = telefone;
    this.possuiPlanoSaude = possuiPlanoSaude;
    this.planosSaude = planosSaude;
    this.senha = senha;
    this.role = Role.especialista;
  }
}
