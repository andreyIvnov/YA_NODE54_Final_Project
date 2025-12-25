const employeesWS = require('../repositories/employeesWS');
const departmentsWS = require('../repositories/departmentsWS');

const getAllEmployees = (filters) => employeesWS.getAllEmployees(filters);
const getEmployeeById = (id) => employeesWS.getEmployeeById(id);

const addEmployee = (employeeObj) => employeesWS.addEmployee({ 
    ...employeeObj,
    firstname: employeeObj["firstname"] ? employeeObj["firstname"] : null,
    lastname: employeeObj["lastname"] ? employeeObj["lastname"] : null,
    startworkyear: employeeObj["startworkyear"] ? employeeObj["startworkyear"] : -1,
    departmentid: employeeObj["departmentid"] ? employeeObj["departmentid"] : null,
});

const updateEmployee = (id, employeeObj) => employeesWS.updateEmployee(id, employeeObj);

const deleteEmployee = async (id) => {
    try {
        try {
            const relatedDepartment = await departmentsWS.getAllDepartments({
                "manager" : id
            });

            console.log("deleteEmployee -> Department update result: \n", relatedDepartment);
            if (relatedDepartment && relatedDepartment.length > 0) {
                await departmentsWS.updateDepartment(relatedDepartment[0]._id.toString(), { manager: null });
            }
        } catch (error) {
            console.log("employeeService -> deleteEmployee.updateDepartment error: ", error);
        }
        const result = await employeesWS.deleteEmployee(id)
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