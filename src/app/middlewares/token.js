import jwt from 'jsonwebtoken';

import key from '../../config/key';

export default (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: 'No authorization found!' });
  }

  const [, token] = auth.split(' ');
  if (!token) {
    return res.status(401).json({ error: 'No token found!' });
  }

  try {
    const decoded = jwt.verify(token, key.secret);
    req.loginUserId = decoded.id;
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Token is not valid!' });
  }
};
