import { Router } from 'express';
import productRoutes from '@modules/products/routes/products.routes';
import userRoutes from '@modules/users/routes/users.routes';
import sessionsRoutes from '@modules/users/routes/session.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();
routes.use('/products', productRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRouter);
routes.get('/', (req, res) => {
    return res.json({ message: 'olá express' });
});
export default routes;
