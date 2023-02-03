import { DataSource } from "typeorm"
import "reflect-metadata"
import { Paciente } from "./entity/pacienteEntity.js"
import { Endereco } from "./entity/enderecoEntity.js"
import { Especialista } from "./entities/EspecialistaEntidade.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "root",
    database: "vollmed",
    synchronize: true,
    logging: false,
    entities: [Paciente, Endereco,Especialista],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(()=>{
console.log("App Data Source inicializado");}).catch((error)=>console.error("Erro durante a inicialização Data Source", error))