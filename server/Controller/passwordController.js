const User = require('../Models/UserSchema'); // Import the User model/schema
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js');

/** Update password in the database */
exports.resetPassword= async (req, res) => {
    const {id, token} = req.params
    const {password} = req.body
    console.log("id",id)
    console.log("pass",password)
    
    jwt.verify(token, "jwt_secret_key", async (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            try {
                // Update password in the database
                await User.findByIdAndUpdate(id, { password: password });
                return res.status(200).json({ msg: "Password updated successfully" });
            } catch (error) {
                console.error("Error updating password:", error);
                return res.status(500).json({ error: "Failed to update password" });
            }
            
        }
    })
};

exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "User not existed" })
            }
            const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" })

            let config = {
                service: 'gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            };

            let transporter = nodemailer.createTransport(config);

            let message = {
                from: EMAIL,
                to: email,
                subject: 'Reset Password Link',
                text: `http://localhost:3000/resetPassword/${user._id}/${token}`,
            };

            transporter.sendMail(message).then(() => {
                return res.status(201).json({
                    msg: "MAil sent for reset password"
                });
            }).catch(error => {
                return res.status(500).json({ error });
            });

        })
};
