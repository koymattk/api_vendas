import { Router } from 'express';
import productRoutes from '@modules/products/routes/products.routes';
import userRoutes from '@modules/users/routes/users.routes';

const routes = Router();
routes.use('/products', productRoutes);
routes.use('/users', userRoutes);
routes.get('/', (req, res) => {
    return res.json({ message: 'olá express' });
});
export default routes;
