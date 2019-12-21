import { Op } from 'sequelize';
import * as Yup from 'yup';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async check(req, res, next, id) {
    const meetup = await Meetup.findByPk(id, {
      include: [{ model: User, as: 'host' }],
    });
    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not exists!' });
    }

    if (meetup.date < new Date()) {
      return res.status(400).json({ error: 'Meetup has already passed!' });
    }

    req.meetup = meetup;
    req.isHost = meetup.user_id === req.tokenUser.id;
    return next();
  }

  async index(req, res) {
    const { date, page = 1 } = req.query;
    const whereClause = {};

    if (req.route.path.split('/')[2] === 'host') {
      whereClause.user_id = req.tokenUser.id;
    }

    if (date) {
      const dtStart = startOfDay(parseISO(date));
      const dtEnd = endOfDay(parseISO(date));
      whereClause.date = { [Op.between]: [dtStart, dtEnd] };
    }

    const meetups = await Meetup.findAll({
      where: whereClause,
      attributes: ['id', 'title', 'description', 'location', 'date'],
      include: [
        {
          model: File,
          attributes: ['id', 'path', 'url'],
          required: true,
        },
        {
          model: User,
          attributes: ['id', 'name', 'email'],
          required: true,
        },
      ],
      limit: 1,
      offset: (page - 1) * 1,
    });
    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date()
        .min(new Date(), 'Past date not allow!')
        .required(),
      file_id: Yup.number().required(),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    if (!(await File.findByPk(req.body.file_id))) {
      return res.status(400).json({ error: 'File not found!' });
    }
    const user_id = req.tokenUser.id;
    const meetup = await Meetup.create({ ...req.body, user_id });
    return res.json(meetup);
  }

  async edit(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date().min(new Date(), 'Past date not allow!'),
      file_id: Yup.number(),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    if (!req.isHost) {
      return res.status(400).json({ error: 'User is not the Meetups Host!' });
    }

    if (req.body.file_id && !(await File.findByPk(req.body.file_id))) {
      return res.status(400).json({ error: 'File not found!' });
    }

    const meetup = await req.meetup.update(req.body);
    return res.json(meetup);
  }

  async remove(req, res) {
    if (!req.isHost) {
      return res.status(400).json({ error: 'User is not the Meetups Host!' });
    }

    await req.meetup.destroy();
    return res.json({ msg: 'Ok' });
  }
}

export default new MeetupController();
