const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    secure: false,
    auth: {
        user: "7e4ce747666f3c",
        pass: "1af376b06daebd",
    },
});
module.exports = {
    sendmail: async function (to, subject, URL) {
        return await transporter.sendMail({
            from: 'Black@gmail.com',
            to: to,
            subject: subject,
            html: `<a href=${URL}>URL</a>`, // html body
        });
    }
}