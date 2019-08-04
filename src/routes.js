import { Router } from 'express';

import ProjectController from './app/controllers/ProjectController';

const routes = Router();

routes.get('/', function(req, res) {
    res.json({ data: "Desafio NodeJS!" });
});

routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectController.store);
routes.put('/projects/:id', ProjectController.checkProject, ProjectController.update);
routes.put('/projects/:id/tasks', ProjectController.checkProject, ProjectController.task);
routes.delete('/projects/:id', ProjectController.checkProject, ProjectController.destroy)

export default routes;
