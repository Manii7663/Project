const User = require('../Models/UserSchema'); // Import the User model/schema
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js');



exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email:email });
        console.log(user)
        if (!user) {
            console.log("email",+email)
            return res.status(401).json({ error: 'Invalid email ID' });
        }

        if (password !== user.password) {
            return res.status(402).json({ error: 'Invalid password' });
        }

        res.status(201).json({ message: 'Login successful', user: user});

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

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


