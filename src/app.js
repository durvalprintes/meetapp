import express from 'express';
import mongoose from 'mongoose'
import routes from './routes';
import dbConfig from './config/database';

class App {
  constructor() {
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose.connect(dbConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }

}

export default new App().express;
