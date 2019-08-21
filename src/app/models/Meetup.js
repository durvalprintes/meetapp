import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      { sequelize },
    );
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'banner' });
    this.belongsTo(models.File, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Meetup;
