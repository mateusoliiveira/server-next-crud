import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import MediaController from '../controllers/MediaController';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload'

const mediaRouter = Router();
const mediaController = new MediaController();
const upload = multer(uploadConfig)

mediaRouter
  .patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    mediaController.update
  );


export default mediaRouter;
