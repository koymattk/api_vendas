import authConfig from '@config/authConfig';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodedToken as ITokenPayload;

        req.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new AppError('invalid JWT token');
    }
}
