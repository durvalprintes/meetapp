import 'dotenv/config';

export default {
  host: process.env.MAIL_HOST,
  port: 2525,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Meetapp Team <noreply@meetapp.com>',
  },
};
