import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import Signup from '../app/models/Signup';

const models = [User, File, Meetup, Signup];

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
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
