/* eslint-disable @typescript-eslint/naming-convention */
import multer from 'multer'
import crypto from 'crypto'
import { extname, resolve, dirname } from 'path'
import { access, constants } from 'fs'
import { AppError, Status } from '../error/ErrorHandler.js'

const __filename = import.meta.url.substring(7)
const __dirname = dirname(__filename)

function validaCaminhoExiste (path): boolean {
  access(path, constants.F_OK, (err) => {
    if (err != null) {
      return true
    }
  })
  return false
}

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const imagePath = resolve(__dirname, '..', '..', 'tmp', 'uploads')

      // if (!validaCaminhoExiste(imagePath)) {
      //   throw new AppError('O diretório não existe.', Status.BAD_REQUEST)
      // }
      cb(null, imagePath)
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err != null) return cb(err)

        return cb(null, res.toString('hex') + extname(file.originalname))
      })
    }
  })
}
