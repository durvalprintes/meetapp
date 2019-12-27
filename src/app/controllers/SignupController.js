import { Op } from 'sequelize';

import { startOfMinute, endOfMinute } from 'date-fns';

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
          attributes: ['id', 'title', 'description', 'location', 'date'],
          where: { date: { [Op.gt]: new Date() } },
        },
      ],
      order: [[Meetup, 'date', 'ASC']],
    });
    return res.json(signups);
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
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [[User, 'name', 'ASC']],
    });
    return res.json({ signups });
  }

  async store(req, res) {
    const {
      tokenUser: { id: user_id, name: user_name, email: user_email },
      meetup: {
        dataValues: { id: meetup_id, title, date },
        User: {
          dataValues: { name: host_name, email: host_email },
        },
      },
    } = req;

    if (req.isHost) {
      return res.json({ error: 'Host cannot sign up in own meetup!' });
    }

    if (await Signup.findOne({ where: { user_id, meetup_id } })) {
      return res.status(400).json({ error: 'User already sign up!' });
    }

    const dtStart = startOfMinute(date);
    const dtEnd = endOfMinute(date);

    const meetup = await Signup.findOne({
      where: { user_id },
      include: [
        {
          model: Meetup,
          where: { date: { [Op.between]: [dtStart, dtEnd] } },
        },
      ],
    });

    if (meetup) {
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
    });

    const signup = await Signup.create({ user_id, meetup_id });
    return res.json(signup);
  }

  async remove(req, res) {
    console.log('AQUI');
    const {
      tokenUser: { id: user_id },
      meetup: {
        dataValues: { id: meetup_id },
      },
    } = req;

    const signup = await Signup.findOne({ where: { user_id, meetup_id } });
    if (!signup) {
      return res.status(400).json({ error: 'User is not signup in this Meetup!' });
    }

    await signup.destroy();
    return res.json({ msg: 'Ok' });
  }
}

export default new SignupController();
