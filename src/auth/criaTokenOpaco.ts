import crypto from 'crypto'
import moment from 'moment'
import allowListRefreshToken from '../database/cache/allowListRefreshToken.js'

export default async function criaTokenOpaco (userId: string): Promise<string> {
  const expires = moment().add(5, 'd').unix()
  const tokenOpaco = crypto.randomBytes(24).toString('hex')
  await allowListRefreshToken.adiciona(tokenOpaco, userId, expires)
  return tokenOpaco
}
