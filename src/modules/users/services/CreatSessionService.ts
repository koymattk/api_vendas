import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class CreatSessionService {
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('email/password combination incorrect !', 401);
        }

        const passwordConfirmerd = await compare(password, user.password);
        if (!passwordConfirmerd) {
            throw new AppError('email/password combination incorrect !', 401);
        }

        const token = sign({}, 'd41d8cd98f00b204e9800998ecf8427e', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        };
    }
}

export default new CreatSessionService();
