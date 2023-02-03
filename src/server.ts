import express from "express";
import { pacienteRouter } from "./routes/pacienteRoutes";

import "reflect-metadata"
import { Router, Request, Response } from "express";
import { especialistaRouter } from "./routes/especialistaRoutes.js";
//import { pacient } from "./controllers/pacienteController";

const app = express();

const router = Router();

app.use(express.json());

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "oi" });
});

router.use(especialistaRouter);
app.use("/especialista", especialistaRouter);

app.use(router);
app.listen(3000, () => console.log("server running on port 3000"));
