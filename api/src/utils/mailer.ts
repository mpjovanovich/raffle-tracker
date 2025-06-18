import { config } from '@/config/config.js';
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

    return await transport.sendMail(mailOptions);
  } catch (error) {
    // TODO: Error Logging
    throw new Error('Failed to send email');
  }
};
