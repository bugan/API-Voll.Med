import express from "express";

import { Router, Request, Response } from "express";
import { especialistaRouter } from './routes/especialistaRoutes.js';

const app = express();

const router = Router();

app.use(express.json());

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "oi" });
});

app.use('/especialista', especialistaRouter);
// router.use('/', especialistaRouter)

app.listen(3000, () => console.log("server running on port 3000"));
