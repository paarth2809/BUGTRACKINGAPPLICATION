const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        required: true,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    password: {
        type: String,
        required: true
    }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model("User", userSchema);
