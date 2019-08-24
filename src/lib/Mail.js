import nodemailer from 'nodemailer';
import Config from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = Config;
    this.transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth,
    });
  }

  sendMail(message) {
    return this.transport.sendMail({
      ...Config.default,
      ...message,
    });
  }
}

export default new Mail();
