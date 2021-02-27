import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productRoutes = Router();

productRoutes.get('/', ProductsController.index);
productRoutes.get('/:id', ProductsController.show);
productRoutes.post('/', ProductsController.create);
productRoutes.put('/:id', ProductsController.update);
productRoutes.delete('/;id', ProductsController.delete);
