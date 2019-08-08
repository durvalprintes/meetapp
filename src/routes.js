import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ aplicacao: 'Meetup' }));

export default routes;
