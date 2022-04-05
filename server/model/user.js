const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: false
    },
    token: {
        type: String,
        required: false
    },
    tokenDate: {
        type: Date,
        required: false
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User