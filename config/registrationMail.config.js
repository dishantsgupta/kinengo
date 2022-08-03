const nodemailer = require("nodemailer");

const registrationMail = async (email, randInt) => {
    try {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'dabbawala46@gmail.com',
                pass: 'vrcjhrognjmvtxwa',
            }
        });
        await transporter.sendMail({
            from: 'dabbawala46@gmail.com',
            to: email,
            subject: 'Testing',
            text: `Dear user,
            Your 6-digit OTP is ${randInt} here. Please click this link http://127.0.0.1:3000/verification for verify your account.`,
        });
        console.log("Email sent successfully...");
    }
    catch (error) {
        console.log(error, "Email not send");
    }
}

module.exports = registrationMail;