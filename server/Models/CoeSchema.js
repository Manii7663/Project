// models/COE.js

const mongoose = require('mongoose');

const CoeSchema = new mongoose.Schema({
  coeName: {
    type: String,
    required: true
  },
  description: String,
  coeHead:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'trainer'
  }]
});

module.exports = mongoose.model('COE', CoeSchema);