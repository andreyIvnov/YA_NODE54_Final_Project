const { Schema, model, SchemaTypes } = require('mongoose');

const employeeSchema = new Schema(
    {
        firstname: String,
        lastname: String,
        startworkyear: Number,
        departmentid: {
            type: SchemaTypes.ObjectId,
            ref: 'department'
        }
    },
    {
        versionKey: false
    }
)

const Employee = model('employee', employeeSchema, 'employees')

module.exports = Employee;