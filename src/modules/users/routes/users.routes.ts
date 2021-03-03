import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';
import updloadConfig from '@config/uploads';
import { required } from 'joi';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const userRoutes = Router();
const upload = multer(updloadConfig);
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
userRoutes.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    UserAvatarController.update,
);

export default userRoutes;
