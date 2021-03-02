import { Request, Response } from 'express';
import CreatSessionService from '../services/CreatSessionService';

class SessionsController {
    public async authenticate(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const user = await CreatSessionService.execute({ email, password });

        return res.json(user);
    }
}

export default new SessionsController();
