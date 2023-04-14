import crypto from 'crypto'
// import * as dotenv from 'dotenv'
// dotenv.config()

function encryptPassword (password): string {
  const iv = crypto.randomBytes(16)
  const key = crypto.scryptSync(process.env.SECRET_KEY as string, 'salt', 32)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(password, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}

function decryptPassword (encryptedPassword: string): string {
  const [ivHex, encryptedHex] = encryptedPassword.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const key = crypto.scryptSync(process.env.SECRET_KEY as string, 'salt', 32)
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export { encryptPassword, decryptPassword }
