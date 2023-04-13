/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from 'jsonwebtoken'
import { type Role } from './roles'

export function verificaTokenJWT (...role: Role[]) {
  return (req, res, next): any => {
    const tokenString: string[] = req.headers.authorization.split(' ')
    const token = tokenString[1]

    if (!token) {
      return res
        .status(403)
        .json({ auth: false, message: 'Nenhum token informado.' })
    }

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(403)
          .send({ auth: false, message: 'Falha ao autenticar o token.' })
      }

      if (role.length > 0 && !role.includes(decoded.role)) {
        console.log(role)
        console.log(decoded)
        return res.status(403).send({ auth: false, message: 'Não autorizado' })
      }

      req.userId = decoded.id
      next()
    })
  }
}
