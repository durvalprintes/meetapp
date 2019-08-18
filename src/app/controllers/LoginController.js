import jwt from 'jsonwebtoken';
import key from '../../config/key';
import User from '../models/User';

export default async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: 'User email not found!' });
  }

  if (!(await user.checkPassword(password))) {
    return res.status(401).json({ error: 'Password does not match!' });
  }

  const { id, name } = user;
  return res.json({
    user: { id, name, email },
    token: jwt.sign({ id }, key.secret, { expiresIn: key.expires }),
  });
};
