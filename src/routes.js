import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = Router();

routes.get('/', (req, res) => res.json({ mensagem: 'Aplicação Meetup!' }));

routes.param('id', UserController.check);
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.edit);
routes.delete('/users/:id', UserController.remove);

export default routes;
