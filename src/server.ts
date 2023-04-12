import * as dotenv from 'dotenv'
import express from 'express'
// import express, { Router, Request, Response } from 'express'
import cors from 'cors'
import 'reflect-metadata'
import rotaAuth from './auth/authRoutes.js'
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

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST'
  ],

  allowedHeaders: [
    'Content-Type'
  ]
}

app.use(cors(corsOpts))

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
rotaAuth(app)

app.use(erro) // do middleware, precisa ser inserido antes do app listen

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
app.listen(process.env.SERVER_PORT, () => { console.log(`server running on port ${process.env.SERVER_PORT}`) }
)

export default app
