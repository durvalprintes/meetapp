import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import Token from './app/middlewares/Token';
import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SignupController from './app/controllers/SignupController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', (req, res) => res.json({ msg: 'Aplicação Meetapp!' }));

routes.post('/login', LoginController);

routes.param('user', UserController.check);
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.use(Token);

routes.get('/users/:user', UserController.show);
routes.put('/users/:user', UserController.edit);
routes.delete('/users/:user', UserController.remove);

routes.get('/files', FileController.index);
routes.post('/files', upload.single('banner'), FileController.store);

routes.param('meetup', MeetupController.check);
routes.get('/meetups', MeetupController.index);
routes.get('/meetups/host', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:meetup', MeetupController.edit);
routes.delete('/meetups/:meetup', MeetupController.remove);

routes.get('/signups', SignupController.index);

routes.post('/meetups/:meetup/signups', SignupController.store);
routes.get('/meetups/:meetup/signups', SignupController.showMany);
routes.delete('/meetups/:meetup/signups', SignupController.remove);

export default routes;
