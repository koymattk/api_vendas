import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);

        const product = await productRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found');
        }

        const productExists = await productRepository.findByName(name);

        if (productExists) {
            throw new AppError('there is already one product with this name');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        return product;
    }
}

export default new UpdateProductService();
