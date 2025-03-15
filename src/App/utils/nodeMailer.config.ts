import nodemailer from 'nodemailer';
import config from '../config';

const sendResetPasswordEmail = async (email: string, resetToken: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.appGmail,
            pass: config.appPassword,
        },
    });
    const resetURL = `${config.base_url}/reset-password?token=${resetToken}`;

    const mailOptions = {
        from: '"Support Team" <your-email@gmail.com>',
        to: email,
        subject: 'Password Reset Request',
        html: `
      <h3>Password Reset From PharmaDesh</h3>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetURL}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
    return { message: `Password reset email sent to ${email}` };
};
export default sendResetPasswordEmail;