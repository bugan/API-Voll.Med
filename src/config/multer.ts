/* eslint-disable @typescript-eslint/naming-convention */
import multer from 'multer'
import crypto from 'crypto'
import { extname, resolve, dirname } from 'path'

const __filename = import.meta.url.substring(7)
const __dirname = dirname(__filename)

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => { cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads')) },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err != null) return cb(err)

        return cb(null, res.toString('hex') + extname(file.originalname))
      })
    }
  })
}
