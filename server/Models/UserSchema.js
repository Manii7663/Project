const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String, // or whatever type you want for your id
    required: true,
    unique: true // Ensure uniqueness if necessary
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['intern', 'employee', 'admin'],
    required: true
  }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

module.exports = mongoose.model("User", UserSchema);
