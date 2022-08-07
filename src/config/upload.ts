import multer from 'multer'
import path from 'path'
import { randomUUID } from 'crypto'

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      callback(null, `${randomUUID()}-${file.originalname}`)
    },
  })
}
