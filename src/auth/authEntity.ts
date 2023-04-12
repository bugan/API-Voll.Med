import { ViewColumn, ViewEntity } from "typeorm";
import { type IAutenticavel } from "./IAutencavel";

@ViewEntity({
  expression: `
    SELECT "paciente"."email" AS "email", "paciente"."senha" AS "senha", "paciente"."id" AS "id" FROM "paciente"
    UNION ALL
    SELECT "especialista"."email" AS "email", "especialista"."senha" AS "senha", "especialista"."id" AS "id" FROM "especialista"
    UNION ALL
    SELECT "clinica"."email" AS "email", "clinica"."senha" AS "senha", "clinica"."id" AS "id" FROM "clinica"
`,
})
export class Autenticaveis implements IAutenticavel {
  @ViewColumn()
  id: string;

  @ViewColumn()
  email: string;

  @ViewColumn()
  senha: string;
}
