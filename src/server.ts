
import * as dotenv from 'dotenv'
import express, { Router,  Request, Response } from 'express'
import "reflect-metadata"
import rotaPaciente from "./pacientes/pacienteRoutes.js"
import rotaEspecialista from "./especialistas/especialistaRoutes.js"
import { AppDataSource } from './data-source.js'
<<<<<<< HEAD
<<<<<<< HEAD
import { erro } from './apiError/ErrorHandler.js'
=======
import { erro } from './middlewareError/error.js'
>>>>>>> d3534e0 (feat: middleware de erro)
=======
import { erro } from './apiError/ErrorHandler.js'
>>>>>>> 81ea340 (update: middleware de erro)

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
  rotaPaciente(app);
  rotaEspecialista(app);

  app.use(erro) //do middleware, precisa ser inserido antes do app listen

app.listen(process.env.SERVER_PORT, () => { console.log(`server running on port ${process.env.SERVER_PORT}`) }
)
export default app