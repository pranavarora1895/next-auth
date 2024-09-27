import User from '@/model/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userID }: any) => {

    //TODO: configure mail for usage

    try {
        const hashedToken = await bcryptjs.hash(userID.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userID,
                {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userID,
                {
                    $set: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        const mailOptions = {
            from: '"Pranav Arora 👻" <pranavarora@next.org>',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)

    }

}