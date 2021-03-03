import { Request, Response } from 'express';
import UpdateAvatarService from '../services/UpdateAvatarService';

class UserAvatarController {
    public async update(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;
        const avatarFilename = req.file.filename;

        const user = await UpdateAvatarService.execute({
            user_id,
            avatarFilename,
        });

        return res.json(user);
    }
}

export default new UserAvatarController();
