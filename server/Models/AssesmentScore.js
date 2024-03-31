const mongoose = require('mongoose');

// Assessment Score Schema
const AssessmentScore = new mongoose.Schema({
    assessmentSessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainingSession',
        required: true
    },
    internId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assessmentDate: {
        type: Date,
        required: true
    },
    totalScore: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('AssessmentScore', AssessmentScore);
