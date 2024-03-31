const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
    batchId: {
        type: Number,
        unique: true,
        required: true
    },
    batchName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: String
});

module.exports  = mongoose.model('Batch', BatchSchema);

