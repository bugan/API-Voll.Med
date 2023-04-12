import { type NextFunction, type Request, type Response } from 'express'
import { RBAC } from 'rbac' // ES5 var RBAC = require('rbac').default;

const rbac = new RBAC({
  roles: ['paciente', 'clinica', 'especialista'],
  permissions: {
    especialista: ['cria', 'atualiza', 'lista', 'deleta'],
    clinica: ['cria', 'atualiza', 'lista', 'deleta'],
    paciente: ['cria', 'atualiza', 'lista', 'deleta']
  },
  grants: {
    clinica: ['cria_especialista'],
    especialista: ['atualiza_especialista', 'lista_especialista', 'deleta_especialista']
  }
})

export async function adminController (req: Request, res: Response, next: NextFunction): Promise<Response> {
  return res.send('Hello admin')
}

export default await rbac.init()
