import { ViewColumn, ViewEntity } from 'typeorm'
import { type IAutenticavel } from './IAutencavel'
import { Role } from './roles.js'

const expression = process.env.DB_TYPE === 'sqlite'
  ? `
SELECT "email", "senha", "role", "id", '/paciente' AS "rota" FROM paciente
UNION ALL
SELECT "email", "senha", "role", "id", '/especialista' AS "rota" FROM especialista
UNION ALL
SELECT "email", "senha", "role", "id", '/clinica' AS "rota" FROM clinica
`
  : `
SELECT email, senha, role, id, '/paciente' AS 'rota' FROM paciente
UNION ALL
SELECT email, senha, role, id, '/especialista' AS 'rota' FROM especialista
UNION ALL
SELECT email, senha, role, id, '/clinica' AS 'rota' FROM clinica
`
@ViewEntity({ expression })

export class Autenticaveis implements IAutenticavel {
  @ViewColumn()
    id: string

  @ViewColumn()
    email: string

  @ViewColumn()
    senha: string

  @ViewColumn()
    rota: string

  @ViewColumn()
    role: Role
}
