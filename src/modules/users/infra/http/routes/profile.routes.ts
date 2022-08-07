import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';
import { celebrate, Segments, Joi } from 'celebrate';
const profileRouter = Router();
const profileController = new ProfileController();

profileRouter
  .get(
    '/',
    isAuthenticated,
    profileController.show
  );


profileRouter
  .patch(
    '/',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string().optional(),
        password_confirmation: Joi.string()
          .when('password',
            {
              is: Joi.exist(),
              then: Joi.required()
            })
          .valid(Joi.ref('password'))
      }
    }),
    isAuthenticated,
    profileController.update
  );


export default profileRouter;
