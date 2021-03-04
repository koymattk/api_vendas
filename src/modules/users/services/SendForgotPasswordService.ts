import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import path from 'path';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
    email: string;
}

class SendForgotPasswordService {
    async execute({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokenRepository);

        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('user does not exists');
        }

        const { token } = await userTokenRepository.generate(user.id);
        const forgotPasswordTempalte = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );
        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API VENDAS] recupareção de senha',
            templateData: {
                file: forgotPasswordTempalte,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`,
                },
            },
        });
    }
}

export default new SendForgotPasswordService();
