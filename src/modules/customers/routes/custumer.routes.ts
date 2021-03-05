import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const customerRoutes = Router();
customerRoutes.use(isAuthenticated);
customerRoutes.get('/', CustomerController.index);
customerRoutes.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    CustomerController.show,
);
customerRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
    }),
    CustomerController.create,
);
customerRoutes.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    CustomerController.update,
);
customerRoutes.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    CustomerController.delete,
);

export default customerRoutes;
