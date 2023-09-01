import nodemailer, { Transporter } from "nodemailer";
import { Email } from "../user/model/user.email";
import "dotenv-flow/config";

export const emailServiceConfig = {
  host: process.env.EMAIL_SERVICE_PROVIDER,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVICE_USER,
    pass: process.env.EMAIL_SERVICE_PASS,
  },
};

export class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(emailServiceConfig);
  }
  async sendEmail(
    fromEmail: string,
    toEmail: Email,
    subject: string,
    description: string
  ) {
    await this.transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: subject,
      html: description,
    });
  }
}
