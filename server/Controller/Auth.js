const User = require('../Models/UserSchema'); // Import the User model/schema



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


exports.newUser = async (req, res) => {
    const { id,name, email, password, role } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // If email doesn't exist, proceed to create the new user
        const newUser = await User.create({ id,name, email, password, role });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
