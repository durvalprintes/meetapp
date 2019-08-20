import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';

const models = [User, File];

class Database {
  constructor() {
    this.connection = new Sequelize(dbConfig);
    this.connection
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(e => {
        console.error('Unable to connect to the database:', e);
      });
    this.init();
  }

  init() {
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
