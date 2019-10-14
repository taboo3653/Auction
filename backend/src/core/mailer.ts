import nodemailer from 'nodemailer';

let transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '1d88b4dde35680',
    pass: '6a1140790a18dc',
  },
});

export default transport;