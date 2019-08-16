import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import key from '../../config/key';

export default async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: 'No authorization found!' });
  }

  const [, token] = auth.split(' ');
  if (!token) {
    return res.status(401).json({ error: 'No token found!' });
  }

  const decoded = await promisify(jwt.verify)(token, key.secret)
    .then(() => {
      req.userId = decoded.id;
      next();
    })
    .catch(() => {
      res.status(401).json({ error: 'Token is not valid!' });
    });

  next();
};
