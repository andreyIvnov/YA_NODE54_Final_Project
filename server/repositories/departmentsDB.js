const Department = require('../models/departmentModel')
const getAllDepartments = (filters) => Department.find(filters);
const getDepartmentBId = (id) => Department.findById(id);
const addDepartment = (depObj) => Department.create(depObj);
const updateDepartment = (id, depObj) => Department.findByIdAndUpdate(id, depObj);
const deleteDepartment = (id) => Department.findByIdAndDelete(id);
module.exports = {
    getAllDepartments,
    getDepartmentBId,
    addDepartment,
    updateDepartment,
    deleteDepartment
}