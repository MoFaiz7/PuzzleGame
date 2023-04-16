const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for performance
const PerformanceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    time: {
        type: Number,
        default: 0
    },

    levelsDone: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Performance = mongoose.model('perves', PerformanceSchema);