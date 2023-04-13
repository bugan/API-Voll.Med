import { Role } from "./roles.js";
import { ViewColumn, ViewEntity } from "typeorm";
import { type IAutenticavel } from "./IAutencavel";

@ViewEntity({
  expression: `
    SELECT "paciente"."email" AS "email", "paciente"."senha" AS "senha","paciente"."role" AS "role", "paciente"."id" AS "id", '/paciente' AS "rota" FROM "paciente"
    UNION ALL
    SELECT "especialista"."email" AS "email", "especialista"."senha" AS "senha","especialista"."role" AS "role", "especialista"."id" AS "id", '/especialista' AS "rota" FROM "especialista"
    UNION ALL
    SELECT "clinica"."email" AS "email", "clinica"."senha" AS "senha", "clinica"."id" AS "id", "clinica"."role" AS "role" ,'/clinica' AS "rota" FROM "clinica"
`,
})
export class Autenticaveis implements IAutenticavel {
  @ViewColumn()
  id: string;

  @ViewColumn()
  email: string;

  @ViewColumn()
  senha: string;

  @ViewColumn()
  rota: string;

  @ViewColumn()
  role: Role;
}
