const nodemailer = require("nodemailer");
const { genToken } = require("../utils/token");
require("dotenv").config();

const emailPassword = process.env?.EMAIL_PASSWORD;
const emailID = process.env?.EMAIL_ID;
const emailTitle = process.env?.EMAIL_TITLE;

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: emailID,
        pass: emailPassword,
    },
});

const verifyConnection = async () => {
    try {
        return transporter.verify();
    } catch (error) {
        console.log(error);
        return false;
    }
};

const sendResetLink = async (receipt) => {
    //console.log("SendLink");
    if (!verifyConnection()) return false;
    let expires = Date.now() + 15 * 60 * 1000;
    const ResetToken = genToken({ id: receipt, expires: expires });
    let message = {
        from: emailTitle + "<" + emailID + ">",
        to: receipt,
        subject: "Password Reset Token",
        html:
            "You can reset your password using the token: <br><b>" +
            ResetToken +
            "</b> <br>If you didn't ask for such a token, please ignore the mail and don't share the token. Token will expire in 15 minutes.",
    };
    try {
        //console.log("Sending mail");
        const results = await transporter.sendMail(message);
        //console.log("Sent mail");
        // console.log(results);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    sendResetLink,
    verifyConnection,
};
