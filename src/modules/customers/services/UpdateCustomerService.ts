import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateProductService {
    async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customer = await customerRepository.findById(id);

        if (!customer) {
            throw new AppError('Product not found');
        }

        const customerExists = await customerRepository.findByEmail(email);

        if (customerExists && customerExists.email !== email) {
            throw new AppError('there is already one product with this name');
        }

        customer.name = name;
        customer.email = email;

        await customerRepository.save(customer);

        return customer;
    }
}

export default new UpdateProductService();
