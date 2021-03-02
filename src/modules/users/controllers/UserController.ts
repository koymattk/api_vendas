import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
class UserController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const user = await CreateUserService.execute({ name, email, password });

        return res.json(user);
    }
    public async listUsers(req: Request, res: Response): Promise<Response> {
        const users = await ListUserService.execute();
        return res.json(users);
    }
}

export default new UserController();
