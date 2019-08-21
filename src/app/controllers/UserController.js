import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async check(req, res, next) {
    const user = await User.findByPk(req.params.user);
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
        .required(),
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
      password: Yup.string().min(6),
      passwordConfirmation: Yup.string().when('password', (password, field) =>
        password
          ? field.required().oneOf([Yup.ref('password')], 'Password confirmation do not match!')
          : field,
      ),
      oldPassword: Yup.string()
        .min(6)
        .when('passwordConfirmation', (passwordConfirmation, field) =>
          passwordConfirmation
            ? field
                .required()
                .notOneOf([Yup.ref('password')], 'New password must be different from old!')
            : field,
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
