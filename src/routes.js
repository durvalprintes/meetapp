import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import Token from './app/middlewares/Token';
import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import FileController from './app/controllers/FileController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', (req, res) => res.json({ mensagem: 'Aplicação Meetup!' }));

routes.post('/login', LoginController);

routes.param('id', UserController.check);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.use(Token);

routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.edit);
routes.delete('/users/:id', UserController.remove);

routes.post('/files', upload.single('file'), FileController);

export default routes;
