const { Schema, model } = require('mongoose');

const shcema = new Schema(
    {
        fullname: String,
        numofactions: Number
    },
    {
        versionKey: false
    }
)

const User = model('user', shcema, 'users');

module.exports = User;