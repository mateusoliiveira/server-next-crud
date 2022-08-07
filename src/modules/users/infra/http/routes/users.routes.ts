import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../middlewares/isAuthenticated';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter
  .get(
    '/',
    isAuthenticated,
    usersController
      .index);

usersRouter
  .get(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
      }
    }),
    usersController
      .show);

usersRouter
  .post(
    '/',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required().min(6),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }
    }),
    usersController
      .create);

usersRouter
  .delete(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
      }
    }),
    usersController
      .delete);


export default usersRouter;
