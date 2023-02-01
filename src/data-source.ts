import { DataSource } from "typeorm"
//import { Paciente } from "./entity/pacienteEntity.js"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "root",
    database: "vollmed",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()