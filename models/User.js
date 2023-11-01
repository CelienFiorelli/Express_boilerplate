const { Schema, model } = require('mongoose');

const User = model('User', new Schema({
    username: {type: String, unique: true, required: true},
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" }
}))

module.exports = User;