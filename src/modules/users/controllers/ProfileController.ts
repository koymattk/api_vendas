import { request, Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
class ProfileController {
    public async show(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;

        console.log(user_id);
        const user = await ShowProfileService.execute({ user_id });

        return res.json(user);
    }
    public async update(req: Request, res: Response): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, password, old_password } = req.body;
        const users = await UpdateProfileService.execute({
            user_id,
            name,
            email,
            password,
            old_password,
        });
        return res.json(users);
    }
}

export default new ProfileController();
