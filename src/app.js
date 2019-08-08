import express from 'express';
import routes from './routes';
import User from './app/models/user';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.user = new User({
      name: 'Durval',
      email: 'durvalprintes@gmail.com.br',
      password: '123456',
    });
    this.server.use(routes);
  }
}

export default new App().server;
