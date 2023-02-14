
import * as dotenv from 'dotenv'
import express from 'express'
// import express, { Router, Request, Response } from 'express'
import 'reflect-metadata'
import rotaPaciente from './pacientes/pacienteRoutes.js'
import rotaEspecialista from './especialistas/especialistaRoutes.js'
import { AppDataSource } from './data-source.js'
import rotaAvaliacoes from './avaliacoes/avaliacoesRoutes.js'

dotenv.config({ path: '.env' })

const app = express()

app.use(express.json())

AppDataSource.initialize()
  .then(() => {
    console.log('App Data Source inicializado')
  })
  .catch((error) => {
    console.error(error)
  })
rotaPaciente(app)
rotaEspecialista(app)
rotaAvaliacoes(app)

app.listen(process.env.SERVER_PORT, () => { console.log(`server running on port ${process.env.SERVER_PORT}`) }
)
export default app
