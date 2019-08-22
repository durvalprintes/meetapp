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
    });
    return res.json({ signups });
  }

  async store(req, res) {
    const {
      tokenUserId: user_id,
      meetup: {
        dataValues: { id: meetup_id },
      },
    } = req;
    const signup = Signup.create({ user_id, meetup_id });
    res.json({ signup });
  }
}

export default new SignupController();
