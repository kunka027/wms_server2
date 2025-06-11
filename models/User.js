const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 1 }, // 1: warehouse Owner, 2: warehouse worker, 3: client, 0: admin
    status: { type: Number, default: 0}, // 1: allow, 0: deny
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('user', userSchema);
