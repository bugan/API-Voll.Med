import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express from "express";
import { pacienteRouter } from "./routes/pacienteRoutes.js";
import "reflect-metadata";
import { Router, Request, Response } from "express";
import { especialistaRouter } from "./routes/especialistaRoutes.js";

import { AppDataSource } from "./data-source.js";

const app = express();
const router = Router();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("App Data Source inicializado");
  })
  .catch((error) => {
    console.error(error);
  });

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "oi" });
});

router.use(especialistaRouter);
app.use("/especialista", especialistaRouter);

router.use(pacienteRouter);
app.use("/paciente", pacienteRouter);

app.use(router);
app.listen(process.env.SERVER_PORT, () =>
  console.log(`server running on port ${process.env.SERVER_PORT}`)
);
