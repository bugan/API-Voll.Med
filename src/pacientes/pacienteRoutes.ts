import { Router } from "express";
import { verificaTokenJWT } from "../auth/verificaTokenJWT.js";

import {
  lerPacientes,
  criarPaciente,
  lerPaciente,
  atualizarPaciente,
  desativaPaciente,
  atualizarEnderecoPaciente,
  listaConsultasPaciente,
} from "./pacienteController.js";
import { Role } from "../auth/roles.js";

export const pacienteRouter = Router();

pacienteRouter.get("/", lerPacientes);
pacienteRouter.post("/", criarPaciente);
pacienteRouter.get("/:id", lerPaciente);
pacienteRouter.get("/:id/consultas", listaConsultasPaciente);
pacienteRouter.put("/:id", verificaTokenJWT(Role.paciente), atualizarPaciente);
pacienteRouter.delete(
  "/:id",
  verificaTokenJWT(Role.paciente),
  desativaPaciente
);
pacienteRouter.patch(
  "/:id",
  verificaTokenJWT(Role.paciente),
  atualizarEnderecoPaciente
);
export default (app) => {
  app.use("/paciente", pacienteRouter);
};
