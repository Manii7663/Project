const User = require("../Models/UserSchema"); // Import the User model/schema
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, PASSWORD } = require("../env.js");

exports.newUser = async (req, res) => {
  const { id,batchId, name, email, password, role, Designation } = req.body;

  try {
    // Check if the ID already exists
    const existingIdUser = await User.findOne({ id: id });
    if (existingIdUser) {
      // ID is not unique, return an error response
      return res.status(400).json({ error: "ID already exist" });
    }

    // Check if the email already exists
    const existingEmailUser = await User.findOne({ email: email });
    if (existingEmailUser) {
      // Email is not unique, return an error response
      return res.status(400).json({ error: "Email already exist" });
    }

    // If email doesn't exist, proceed to create the new user
    const newUser = await User.create({
      id,
      batchId,
      name,
      email,
      password,
      role,
      Designation,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.passwordMail = async (req, res) => {
  const { userEmail, name } = req.body;

  // Generate a random dummy password (replace this with your actual dummy password generation logic)
  const dummyPassword = "hello"; // Implement your logic to generate a random dummy password

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: name,
      intro: "Your temporary password",
      table: {
        data: [
          {
            item: "Temporary Password:",
            description: dummyPassword,
          },
        ],
      },
      outro:
        "Please use this temporary password to log in and reset your password.",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Temporary Password",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "You should receive an email with a temporary password.",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

// Example function to generate a random dummy password (replace this with your actual dummy password generation logic)
function generateDummyPassword() {
  // Generate a random password string
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let dummyPassword = "";
  for (let i = 0; i < length; i++) {
    dummyPassword += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return dummyPassword;
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findOne({ id: userId});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  console.log("in api")
  const updatedUser = req.body; // Assuming the updated user data is sent in the request body
  console.log(updatedUser)
  
  try {
    const user = await User.findByIdAndUpdate(updatedUser._id, updatedUser, { new: true });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params._id;
  
  try {
    // Delete user from the database
    await User.findByIdAndDelete(userId);
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


