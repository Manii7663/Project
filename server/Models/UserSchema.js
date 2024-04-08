const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String, // or whatever type you want for your id
      required: true,
      unique: true, // Ensure uniqueness if necessary
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Intern", "Employee", "Admin"],
      required: true,
    },
    Designation: {
      type: String,
      enum: [
        "Manager",
        "Software Engineer",
        "Data Analyst",
        "Solution Enabler",
        "Solution Consultant",
        "Senior Software Engineer",
        "Data Engineer",
        "Trainee Engineer",
        "Developer",
      ], // Use enum values
      required: true,
    },
  },
); // Add timestamps for createdAt and updatedAt fields

module.exports = mongoose.model("User", UserSchema);
