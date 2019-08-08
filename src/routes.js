import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = Router();

routes.get('/', (req, res) => res.json({ mensagem: 'Aplicação Meetup!' }));

routes.post('/users', UserController.store);

export default routes;
