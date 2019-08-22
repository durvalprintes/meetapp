import { Model } from 'sequelize';

class Signup extends Model {
  static init(sequelize) {
    return super.init({}, { sequelize, modelName: 'signup' });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Meetup, { foreignKey: 'meetup_id', as: 'meetup' });
  }
}
export default Signup;
