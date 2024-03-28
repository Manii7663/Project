const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js');

exports.passwordMail = async (req, res) => {
    const { userEmail,name } = req.body;

    // Generate a random dummy password (replace this with your actual dummy password generation logic)
    const dummyPassword = "dummy"; // Implement your logic to generate a random dummy password

    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: name,
            intro: "Your temporary password",
            table: {
                data: [
                    {
                        item: "Temporary Password:",
                        description: dummyPassword,
                    }
                ]
            },
            outro: "Please use this temporary password to log in and reset your password."
        }
    };

    let mail = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Temporary Password",
        html: mail
    };

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "You should receive an email with a temporary password."
        });
    }).catch(error => {
        return res.status(500).json({ error });
    });
};

// Example function to generate a random dummy password (replace this with your actual dummy password generation logic)
function generateDummyPassword() {
    // Generate a random password string
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let dummyPassword = "";
    for (let i = 0; i < length; i++) {
        dummyPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return dummyPassword;
}


exports.sendOTP = async (req, res) => {
    const { userEmail, OTP } = req.body;
    console.log("in sendOTP ")

    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: 'https://mailgen.js/'
        }
    });

    let response = {
        body: {
            
            intro: "Your One-Time Password (OTP)",
            table: {
                data: [
                    {
                        item: "OTP:",
                        description: OTP,
                    }
                ]
            },
            outro: "Please use this OTP to verify your identity."
        }
    };

    let mail = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "One-Time Password (OTP)",
        html: mail
    };

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "You should receive an email with a One-Time Password (OTP)."
        });
    }).catch(error => {
        return res.status(500).json({ error });
    });
};

