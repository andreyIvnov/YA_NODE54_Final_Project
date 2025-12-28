const employeesDB = require('../repositories/employeesDB');
const departmentsDB = require('../repositories/departmentsDB');

const getAllEmployees = (filters) => employeesDB.getAllEmployees(filters);
const getEmployeeById = (id) => employeesDB.getEmployeeById(id);

const addEmployee = (employeeObj) => employeesDB.addEmployee({ 
    ...employeeObj,
    firstname: employeeObj["firstname"] ? employeeObj["firstname"] : null,
    lastname: employeeObj["lastname"] ? employeeObj["lastname"] : null,
    startworkyear: employeeObj["startworkyear"] ? employeeObj["startworkyear"] : -1,
    departmentid: employeeObj["departmentid"] ? employeeObj["departmentid"] : null,
});

const updateEmployee = (id, employeeObj) => employeesDB.updateEmployee(id, employeeObj);

const deleteEmployee = async (id) => {
    try {
        try {
            const relatedDepartment = await departmentsDB.getAllDepartments({
                "manager" : id
            });

            console.log("deleteEmployee -> Department update result: \n", relatedDepartment);
            if (relatedDepartment && relatedDepartment.length > 0) {
                await departmentsDB.updateDepartment(relatedDepartment[0]._id.toString(), { manager: null });
            }
        } catch (error) {
            console.log("employeeService -> deleteEmployee.updateDepartment error: ", error);
        }
        const result = await employeesDB.deleteEmployee(id)
        return result;
    } catch (error) {
        console.log("employeeService -> deleteEmployee error:\n", error);
        throw error;
    }
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
}