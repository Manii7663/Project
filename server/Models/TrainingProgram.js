// models/TrainingProgram.js

const mongoose = require('mongoose');

const TrainingProgram = new mongoose.Schema({
  programId:{
    type:Number,
    required:true
  },
  programName: {
    type: String,
    required: true
  },
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  
  coe:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'COE'
  }
});


module.exports= mongoose.model('TrainingProgram', TrainingProgram);