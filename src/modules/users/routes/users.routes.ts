import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';
import { required } from 'joi';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const userRoutes = Router();

userRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    UserController.create,
);
userRoutes.get('/', isAuthenticated, UserController.listUsers);

export default userRoutes;
