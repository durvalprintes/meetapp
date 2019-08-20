import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async check(req, res, next) {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({ error: 'User not found!' });
    }
    req.user = user;
    return next();
  }

  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required('Password not found!'),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    if (await User.findOne({ where: { email: req.body.email } })) {
      return res.status(400).json({ error: 'User email already exists!' });
    }

    const user = await User.create(req.body);
    return res.json(user);
  }

  async show(req, res) {
    return res.json(req.user);
  }

  async edit(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string()
        .min(6)
        .when('password', (password, field) => (password ? field.required() : field)),
      password: Yup.string()
        .min(6)
        .notOneOf([Yup.ref('oldPassword')]),
      passwordConfirmation: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required().oneOf([Yup.ref('password')]) : field,
      ),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    const { email, oldPassword } = req.body;

    if (email && (await User.findOne({ where: { email } }))) {
      return res.status(400).json({ error: 'User email already exists!' });
    }

    if (oldPassword && !(await req.user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old password does not match!' });
    }

    const user = await req.user.update(req.body);
    return res.json(user);
  }

  async remove(req, res) {
    await req.user.destroy();
    return res.json({ msg: 'Ok' });
  }
}

export default new UserController();
