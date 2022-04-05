const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    recipients: [{
        type: String, required: true  
    }],
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true })

const SMS = mongoose.model('SMS', userSchema)

module.exports = SMS