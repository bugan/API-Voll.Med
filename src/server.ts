import * as dotenv from 'dotenv'
import express from 'express'
// import express, { Router, Request, Response } from 'express'
import 'reflect-metadata'
import rotaPaciente from './pacientes/pacienteRoutes.js'
import rotaEspecialista from './especialistas/especialistaRoutes.js'
import rotaPlanoDeSaude from './planosDeSaude/planosDeSaudeRoutes.js'
import rotaClinica from './clinicas/clinicaRoutes.js'
import { AppDataSource } from './data-source.js'
import rotaAvaliacoes from './avaliacoes/avaliacoesRoutes.js'
import rotaConsulta from './consultas/consultaRoutes.js'
import { erro } from './apiError/ErrorHandler.js'

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
rotaClinica(app)
rotaConsulta(app)
rotaPlanoDeSaude(app)

app.use(erro) // do middleware, precisa ser inserido antes do app listen

app.listen(process.env.SERVER_PORT, () => { console.log(`server running on port ${process.env.SERVER_PORT}`) }
)

export default app
