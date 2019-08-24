import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    this.mailer = nodemailer.createTransport({
      host,
      port,
      secure,
      auth,
    });
    this.templateMail();
  }

  templateMail() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'email');
    const options = {
      viewEngine: {
        layoutsDir: viewPath,
        partialsDir: resolve(viewPath, 'partials/'),
        defaultLayout: 'default_layout',
        extname: '.hbs',
      },
      viewPath,
      extName: '.hbs',
    };

    this.mailer.use('compile', hbs(options));
  }

  sendMail(message) {
    return this.mailer.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
