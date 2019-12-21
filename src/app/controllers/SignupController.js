import { Op } from 'sequelize';

import Signup from '../models/Signup';
import Meetup from '../models/Meetup';
import User from '../models/User';

import Mail from '../../lib/Mail';

class SignupController {
  async index(req, res) {
    const signups = await Signup.findAll({
      where: { user_id: req.tokenUser.id },
      attributes: ['id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'title', 'description', 'location', 'date'],
        },
      ],
      order: [[{ model: Meetup, as: 'meetup' }, 'date', 'DESC']],
    });
    return res.json({ signups });
  }

  async showMany(req, res) {
    const {
      meetup: {
        dataValues: { id: meetup_id },
      },
    } = req;

    const signups = await Signup.findAll({
      where: { meetup_id },
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [[{ model: User, as: 'user' }, 'name', 'ASC']],
    });
    return res.json({ signups });
  }

  async store(req, res) {
    const {
      tokenUser: { id: user_id, name: user_name, email: user_email },
      meetup: {
        dataValues: {
          id: meetup_id,
          title,
          date,
          host: {
            dataValues: { name: host_name, email: host_email },
          },
        },
      },
    } = req;

    if (req.isHost) {
      return res.json({ error: 'Host cannot sign up in own meetup!' });
    }

    if (await Signup.findOne({ where: { user_id, meetup_id } })) {
      return res.status(400).json({ error: 'User already sign up!' });
    }

    const meetups = await Signup.findAll({
      where: { user_id },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: { date: { [Op.eq]: date } },
        },
      ],
    });

    if (meetups.length !== 0) {
      return res.status(400).json({ error: 'Meetup with conflict date!' });
    }

    await Mail.sendMail({
      to: `${host_name}<${host_email}>`,
      subject: `Nova inscrição para ${title}`,
      template: 'signup_template',
      context: {
        host_name,
        user_name,
        user_email,
      },
      text: `Olá, ${host_name}! O usuário ${user_name} está inscrito. Entre em contato pelo email ${user_email}. Equipe Meetapp.`,
    });

    const signup = await Signup.create({ user_id, meetup_id });
    return res.json(signup);
  }
}

export default new SignupController();
