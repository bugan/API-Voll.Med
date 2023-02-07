
import * as dotenv from 'dotenv'
import express, { Router,  Request, Response } from 'express'
import "reflect-metadata"
import { pacienteRouter } from "./routes/pacienteRoutes.js";
import { especialistaRouter } from './routes/especialistaRoutes.js'
import { Router, Request, Response } from "express";import { especialistaRouter } from "./routes/especialistaRoutes.js";
import { AppDataSource } from './data-source.js'
dotenv.config({ path: '.env' })


const app = express()
const router = Router()

app.use(express.json())

AppDataSource.initialize()
  .then(() => {
    console.log('App Data Source inicializado')
  })
  .catch((error) => {
    console.error(error)
  })

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'oi' })
})

router.use(especialistaRouter)
app.use('/especialista', especialistaRouter)

router.use(pacienteRouter)
app.use('/paciente', pacienteRouter)

app.use(router)
app.listen(process.env.SERVER_PORT, () => { console.log(`server running on port ${process.env.SERVER_PORT}`) }
)
export default app