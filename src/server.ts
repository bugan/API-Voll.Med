import express from "express";
import { pacienteRouter } from "./routes/pacienteRoutes.js";

import { Router, Request, Response } from "express";

const app = express();

const route = Router();

app.use(express.json());

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "oi" });
});

route.use(pacienteRouter);

app.use(route);
app.listen(3000, () => "server running on port 3000");

export default app;
