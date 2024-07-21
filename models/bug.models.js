const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'PENDING',
        enum: ['PENDING', 'RESOLVED']
    },
    description: {
        type: String,
        required: true,
        lowercase: true
    }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Bug', bugSchema);
