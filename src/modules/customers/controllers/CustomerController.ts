import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

class CustomerController {
    public async index(req: Request, res: Response): Promise<Response> {
        const customer = await ListCustomerService.execute();

        return res.json(customer);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const customer = await ShowCustomerService.execute({ id });

        return res.json(customer);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email } = req.body;

        const customer = await CreateCustomerService.execute({
            name,
            email,
        });

        return res.json(customer);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, email } = req.body;

        const customer = await UpdateCustomerService.execute({
            id,
            name,
            email,
        });

        return res.json(customer);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        await DeleteCustomerService.execute({ id });

        return res.json({ message: `produto de id ${id} exluido com sucesso` });
    }
}

export default new CustomerController();
