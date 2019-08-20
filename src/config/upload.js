import multer from 'multer';
import crypto from 'crypto';
import { resolve, extname } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (error, buffer) => {
        if (error) return callback(error);
        return callback(null, buffer.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
