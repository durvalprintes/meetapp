import express from 'express';
import mongoose from 'mongoose'
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
    mongoose.connect(dbConfig.uri, {
      useFindAndModify:false,
      useNewUrlParser: true
    });
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use((req, res, next) => {  
      console.log(`Req#${++this.count}`);
      next();
    });
  }

  routes() {
    this.express.use(routes);
  }

}

export default new App().express;
