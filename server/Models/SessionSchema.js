const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  // Reference to the Training Program associated with this session
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TrainingProgram",
    required: true,
  },
  programName:{
    type:String,
    required:true,
  },
  Startdatetime: {
    type: Date,
    required: true,
  },
  Enddatetime: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  // Array of trainees (interns or employees) attending this session
  trainees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  ],
  trainers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

  ],
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending" 
  }
});


module.exports = mongoose.model("TrainingSession", SessionSchema);
