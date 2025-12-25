const Employee = require('../models/employeeModel');
const getAllEmployees = (filters) => Employee.find(filters)
const getEmployeeById = (id) => Employee.findById(id);
const addEmployee = (obj) => Employee.create(obj);
const updateEmployee = (id, obj) => Employee.findByIdAndUpdate(id, obj);
const deleteEmployee = (id) => Employee.findByIdAndDelete(id);

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
}