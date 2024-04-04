const User = require("../Models/UserSchema"); // Import the User model/schema
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, PASSWORD } = require("../env.js");

exports.newUser = async (req, res) => {
  const { id, name, email, password, role, Designation } = req.body;

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
  const dummyPassword = "dummy"; // Implement your logic to generate a random dummy password

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
