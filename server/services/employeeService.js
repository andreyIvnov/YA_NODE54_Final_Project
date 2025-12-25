const employeesWS = require('../repositories/employeesWS');

const getAllEmployees = (filters) => employeesWS.getAllEmployees(filters);
const getEmployeeById = (id) => employeesWS.getEmployeeById(id);
const addEmployee = (employeeObj) => employeesWS.addEmployee(employeeObj);
const updateEmployee = (id, employeeObj) => employeesWS.updateEmployee(id, employeeObj);
const deleteEmployee = (id) => employeesWS.deleteEmployee(id);

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
}