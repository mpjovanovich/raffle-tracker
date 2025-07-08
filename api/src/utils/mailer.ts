import { config } from '@raffle-tracker/config';
import nodemailer from 'nodemailer';

export const sendEmail = async (subject: string, html: string, to: string) => {
  try {
    let transport: nodemailer.Transporter;
    const mailProvider = config.emailProvider;

    if (mailProvider === 'gmail') {
      transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.emailUser,
          pass: config.emailPassword,
        },
      });
    } else if (mailProvider === 'mailtrap') {
      transport = nodemailer.createTransport({
        host: config.emailHost,
        port: config.emailPort,
        auth: {
          user: config.emailUser,
          pass: config.emailPassword,
        },
      });
    } else {
      throw new Error('Invalid email provider');
    }

    const mailOptions = {
      from: config.emailFrom,
      to: to,
      subject: subject,
      html: html,
    };

    return await transport.sendMail(mailOptions, (err, info) => {
      // TODO: Logging
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    });
  } catch (error) {
    // TODO: Logging
    console.error(error);
    throw new Error('Failed to send email');
  }
};
