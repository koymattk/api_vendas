import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const emailExists = await userRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('there is already one user with this name');
        }
        const user = userRepository.create({ name, email, password });

        await userRepository.save(user);

        return user;
    }
}

export default new CreateUserService();
