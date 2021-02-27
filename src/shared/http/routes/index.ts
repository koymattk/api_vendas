import { Router } from 'express';
import productRoutes from '@modules/products/routes/products.routes';

const routes = Router();
routes.use('/products', productRoutes);
routes.get('/', (req, res) => {
    return res.json({ message: 'olá express' });
});
export default routes;
