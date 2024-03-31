const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    // Reference to the Training Program associated with this session
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainingProgram',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    // Reference to the Center of Excellence (COE) associated with this session
    coe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'COE',
        required: true
    },
    // Array of trainees (interns or employees) attending this session
    trainees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('TrainingSession', SessionSchema);

