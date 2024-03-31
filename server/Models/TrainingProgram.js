// models/TrainingProgram.js

const mongoose = require('mongoose');

const TrainingProgram = new mongoose.Schema({
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
  lastUpdatedDate: {
    type: Date,
    default: Date.now
  },
  coes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'COE'
  }]
});


module.exports= mongoose.model('TrainingProgram', TrainingProgram);