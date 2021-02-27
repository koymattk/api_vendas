import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import express, { Request, Response } from 'express';
import routes from './routes';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((error: Error, req: Request, res: Response) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    return res.status(500).json({
        error: 'error',
        message: 'internal server error',
    });
});

app.listen(3000, () => console.log('Running on port 3000'));