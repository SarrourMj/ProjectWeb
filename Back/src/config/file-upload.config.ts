import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const courseStorage = diskStorage({
  destination: './uploads/courses',
  filename: (_req, file, cb) => {
    const filename: string = uuidv4();
    const extension: string = path.parse(file.originalname).ext;
    cb(null, `${filename}${extension}`);
  },
});

export const certificateStorage = diskStorage({ 
  destination: './uploads/certificates',
  filename: (_req, file, cb) => {
    const filename: string = uuidv4();
    const extension: string = path.parse(file.originalname).ext;
    cb(null, `${filename}${extension}`);
  },
});