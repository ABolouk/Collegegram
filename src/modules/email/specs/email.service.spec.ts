import { Email } from "../../user/model/user.email";
import { EmailService } from "../email.service";

describe("Email Service", () => {
    describe("Send Email", () => {

        let emailService: EmailService;

        beforeAll(() => {
            emailService = new EmailService();
        })

        it("should send email", async () => {
            const info = await emailService.sendEmail(
                '"Greedy Group" <greedy.rahnema@gmail.com>',
                'amirhosseinbolouk@gmail.com' as Email,
                'Forget Password',
                'Hello World!'
            );
        }, 2 * 60 * 1000)
    })
});