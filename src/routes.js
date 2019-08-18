import { Router } from 'express';
import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import Token from './app/middlewares/Token';

const routes = Router();

routes.get('/', (req, res) => res.json({ mensagem: 'Aplicação Meetup!' }));

routes.post('/login', LoginController);
routes.param('id', UserController.check);
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.use(Token);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.edit);
routes.delete('/users/:id', UserController.remove);

export default routes;
