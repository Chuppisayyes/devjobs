import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.pass_email,
      },
    });
  }

  async sendVerificationEmail(to: string, verifyUrl: string) {
    const mailOptions = {
      from: process.env.email,
      to,
      subject: 'Xác thực Email',
      html: `<p>Vui lòng nhấn vào liên kết dưới đây để xác thực email của bạn:</p><a href="${verifyUrl}">Xác thực Email</a>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  }
}
