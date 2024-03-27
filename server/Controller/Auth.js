const UserSchema = require('../Models/UserSchema');

exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    console.log("i am in auth")

    try {
        const user = await UserSchema.findOne({ email });
        if (!user) {
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