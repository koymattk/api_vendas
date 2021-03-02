import authConfig from '@config/authConfig';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export default function isAuthenticated(
    rea: Request,
    res: Response,
    next: NextFunction,
): void {
    const authHeader = rea.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token, authConfig.jwt.secret);
        return next();
    } catch (error) {
        throw new AppError('invalid JWT token');
    }
}
