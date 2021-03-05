import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);
        const user = await customerRepository.findById(id);
        if (!user) {
            throw new AppError('Customer not found', 404);
        }
        return user;
    }
}

export default new ShowCustomerService();
