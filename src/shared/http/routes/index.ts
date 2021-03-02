import { Router } from 'express';
import productRoutes from '@modules/products/routes/products.routes';
import userRoutes from '@modules/users/routes/users.routes';
import sessionsRoutes from '@modules/users/routes/session.routes';

const routes = Router();
routes.use('/products', productRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);
routes.get('/', (req, res) => {
    return res.json({ message: 'olá express' });
});
export default routes;
