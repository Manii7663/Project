// models/COE.js

const mongoose = require('mongoose');

const CoeSchema = new mongoose.Schema({
  coeName: {
    type: String,
    required: true
  },
  description: String,
  // Programs associated with this COE
  trainerId:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('COE', CoeSchema);