const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String , required: true},
    passwordHash: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: Number },
    lng: { type: Number },
    resetPasswordToken: { type: String , default: null},
    resetPasswordExpires: { type: Date , default: null},
});

const User = mongoose.model('User', userSchema);

module.exports = User;