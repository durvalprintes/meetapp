import { Op } from 'sequelize';
import Signup from '../models/Signup';
import Meetup from '../models/Meetup';

class SignupController {
  async index(req, res) {
    const signups = await Signup.findAll({
      where: { user_id: req.tokenUserId },
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
      tokenUserId: user_id,
      meetup: {
        dataValues: { id: meetup_id, date },
      },
    } = req;

    if (req.isHost) {
      return res.json({ error: 'Host cannot sign up in own meetup!' });
    }

    if (await Signup.findOne({ where: { user_id, meetup_id } })) {
      return res.status(400).json({ error: 'User already sign up!' });
    }

    const meetups = await Signup.findAll({
      where: { user_id: req.tokenUserId },
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

    const signup = await Signup.create({ user_id, meetup_id });
    return res.json({ signup });
  }
}

export default new SignupController();
