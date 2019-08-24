import { Op } from 'sequelize';

import Signup from '../models/Signup';
import Meetup from '../models/Meetup';

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

  async store(req, res) {
    const {
      tokenUser: { id: user_id },
      meetup: {
        dataValues: {
          id: meetup_id,
          title,
          date,
          host: {
            dataValues: { name, email },
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
      to: `${name}<${email}>`,
      subject: `Nova inscrição para o(a) ${title}`,
      text: `Olá, ${name}! O usuário ${req.tokenUser.name} está inscrito. Entre em contato pelo email ${req.tokenUser.email}.`,
    });

    const signup = await Signup.create({ user_id, meetup_id });
    return res.json(signup);
  }
}

export default new SignupController();
