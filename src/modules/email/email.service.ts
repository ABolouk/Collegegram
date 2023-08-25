import nodemailer, { Transporter } from "nodemailer";
import { UserEmail } from "../user/model/user.email";
import dotenv from "dotenv-flow"

dotenv.config();

const emailServiceConfig = {
    host: process.env.EMAIL_SERVICE_PROVIDER || "test@gmail.com",
    port: +(process.env.EMAIL_SERVICE_PORT || "465"),
    secure: true,
    auth: {
        user: process.env.EMAIL_SERVICE_USER || "test",
        pass: process.env.EMAIL_SERVICE_PASS || "test",
    },
};

export class EmailService {
    private transporter: Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport(emailServiceConfig);
    }
    async sendEmail(fromEmail: string, toEmail: UserEmail, subject: string, description: string) {
        await this.transporter.sendMail({
            from: fromEmail,
            to: toEmail,
            subject: subject,
            html: description,
        });
    };
}