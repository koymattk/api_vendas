import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import updloadConfig from '@config/uploads';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';
import { join } from 'path';

const profileRoutes = Router();

profileRoutes.use(isAuthenticated);

profileRoutes.get('/', ProfileController.show);

profileRoutes.put(
    '/avatar',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            old_password: Joi.string(),
            password: Joi.string().optional(),
            password_confirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(),
                    then: Joi.required(),
                }),
        },
    }),
    ProfileController.update,
);

export default profileRoutes;
