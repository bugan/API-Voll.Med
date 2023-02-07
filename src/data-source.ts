import { DataSource } from 'typeorm'
import 'reflect-metadata'
import { Paciente } from './entity/pacienteEntity.js'
import { Endereco } from './entity/enderecoEntity.js'
import { Especialista } from './entities/EspecialistaEntidade.js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Paciente, Endereco, Especialista],
  migrations: [],
  subscribers: []
})
