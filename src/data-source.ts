import { DataSource } from "typeorm";
import "reflect-metadata"
import { Especialista } from "./entities/EspecialistaEntidade";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "12345",
  database: "localmed",
  synchronize: true,
  logging: true,
  entities: [ Especialista],
  subscribers: [],
  migrations: [],
})

AppDataSource.initialize().then(()=>{
console.log("App Data Source inicializado");}).catch((error)=>console.error("Erro durante a inicialização Data Source", error));
