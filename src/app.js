import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import dbConfig from './config/database';

class App {
  constructor() {
    this.count = 0;
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    this.connection = mongoose
      .connect(dbConfig.uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => console.log('Database is connected...'))
      .catch(err => console.log(err));
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use((req, res, next) => {
      console.log(`Req#${(this.count += 1)}`);
      next();
    });
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
