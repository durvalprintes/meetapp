import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        hooks: {
          beforeSave: user => {
            if (user.password) {
              user.password_hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
            }
          },
        },
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Meetup);
    this.hasMany(models.Signup);
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password_hash);
  }
}

export default User;
