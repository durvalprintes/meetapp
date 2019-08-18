/* eslint-disable class-methods-use-this */
import User from '../models/User';

class UserController {
  async check(req, res, next) {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({ error: 'User not found!' });
    }
    return next();
  }

  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async store(req, res) {
    const { id, name, email } = await User.create(req.body);
    return res.json({ id, name, email });
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id);
    return res.json(user);
  }

  async edit(req, res) {
    const { id } = req.params;
    const { name, email } = await User.update(req.body, {
      where: { id },
    });
    return res.json({ id, name, email });
  }

  async remove(req, res) {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    return res.json(user);
  }
}

export default new UserController();
