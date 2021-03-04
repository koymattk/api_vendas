import { Request, Response } from 'express';
import SendForgotPasswordService from '../services/SendForgotPasswordService';

class ForgotPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        await SendForgotPasswordService.execute({ email });

        return res.status(204).json();
    }
}

export default new ForgotPasswordController();
