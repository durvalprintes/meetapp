import { Router } from 'express';

import ProjectController from './app/controllers/ProjectController';

const routes = Router();

routes.get('/', (req, res) => res.json({ data: 'Desafio 1 NodeJS!' }));

routes.param('id', ProjectController.checkProject);
routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectController.store);
routes.put('/projects/:id', ProjectController.update);
routes.put('/projects/:id/tasks', ProjectController.task);
routes.delete('/projects/:id', ProjectController.destroy);

export default routes;
