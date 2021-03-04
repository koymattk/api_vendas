import nodemailer from 'nodemailer';

interface ISendMail {
    to: string;
    body: string;
}

class EtherealMail {
    static async sendMail({ to, body }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass, // generated ethereal password
            },
        });
        const message = await transporter.sendMail({
            from: 'equipe@apiVendas',
            to,
            subject: 'recuperação de senha',
            text: body,
        });
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default EtherealMail;
