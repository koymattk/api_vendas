import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

class ListProductService {
    async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepository);

        const products = await productRepository.find();

        return products;
    }
}

export default new ListProductService();
