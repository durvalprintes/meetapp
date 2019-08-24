import { Op } from 'sequelize';
import * as Yup from 'yup';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async check(req, res, next) {
    const meetup = await Meetup.findByPk(req.params.meetup, {
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

    const dtStart = startOfDay(parseISO(date));
    const dtEnd = endOfDay(parseISO(date));

    const meetups = await Meetup.findAll({
      where: {
        user_id: req.tokenUser.id,
        date: { [Op.between]: [dtStart, dtEnd] },
      },
      attributes: ['id', 'title', 'description', 'location', 'date'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'host',
          attributes: ['id', 'name', 'email'],
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

    req.body.user_id = req.tokenUser.id;
    const meetup = await Meetup.create(req.body);
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
