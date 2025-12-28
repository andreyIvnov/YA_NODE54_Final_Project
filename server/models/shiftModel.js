const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        date: Date,
        starthour: Number,
        endhour: Number
    },
    {
        versionKey: false
    }
)

const Shift = model('shift', schema, 'shifts');

module.exports = Shift;