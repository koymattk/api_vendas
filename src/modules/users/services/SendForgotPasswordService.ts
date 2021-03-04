import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
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

        const token = await userTokenRepository.generate(user.id);
        //console.log(token);
        await EtherealMail.sendMail({
            to: email,
            body: `Solicitação de redefinição de senha recebida: ${token?.token}`,
        });
    }
}

export default new SendForgotPasswordService();
