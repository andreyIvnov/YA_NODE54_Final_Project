const { Schema, model, SchemaTypes } = require('mongoose');

const schema = new Schema(
    {
        name: String,
        manager: {
            type: SchemaTypes.ObjectId,
            ref: 'employee'
        }
    },
    {
        versionKey: false
    }
)

const Department = model('deparment', schema, 'departments')

module.exports = Department;