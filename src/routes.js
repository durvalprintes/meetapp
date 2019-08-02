import { Router } from 'express';

import ProjectController from './app/controllers/ProjectController';

const routes = Router();

routes.get('/', function(req, res) {
    res.json({ data: "Hello world!" });
})

routes.get('/projects', ProjectController.index);

export default routes;
