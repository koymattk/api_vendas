import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
    email: string;
    password: string;
}

class CreatSessionService {
    async execute({ email, password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('email/password combination incorrect !', 401);
        }

        const passwordConfirmerd = await compare(password, user.password);
        if (!passwordConfirmerd) {
            throw new AppError('email/password combination incorrect !', 401);
        }
        return user;
    }
}

export default new CreatSessionService();
