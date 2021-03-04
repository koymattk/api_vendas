import AppError from '@shared/errors/AppError';
import { string } from 'joi';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import { hash } from 'bcryptjs';

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    async execute({ token, password }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokenRepository);

        const userToken = await userTokenRepository.findByToken(token);
        if (!userToken) {
            throw new AppError('user Token does not exists');
        }
        const user = await userRepository.findById(userToken.user_id);
        if (!user) {
            throw new AppError('user  does not exists');
        }
        const tokenCreatedAt = userToken.created_at;
        const comparaDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), comparaDate)) {
            throw new AppError('token Expired');
        }

        user.password = await hash(password, 8);
    }
}

export default new ResetPasswordService();
