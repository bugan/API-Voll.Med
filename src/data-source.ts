import "reflect-metadata"
import { DataSource } from "typeorm"
import { Paciente } from "./entity/pacienteEntity.js"
import { Endereco } from "./entity/enderecoEntity.js"
import { Especialista } from "./entities/EspecialistaEntidade.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345",
    database: "vollmed",
    synchronize: true, //sincroniza entidades
    logging: false,
    entities: [Paciente, Endereco,Especialista],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(()=>{
console.log("App Data Source inicializado");}).catch((error)=>console.error("Erro durante a inicialização Data Source", error))