const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter a user_id'],
        ref: 'User',
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: [true, 'Email already exists'],
        match: [/.+@.+\..+/, 'Please enter a valid email'],
    },

})

module.exports = mongoose.model('User', userSchema);