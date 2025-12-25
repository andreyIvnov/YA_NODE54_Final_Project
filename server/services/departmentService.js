const departmentsWS = require('../repositories/departmentsWS');
const employeesWS = require('../repositories/employeesWS');

const getAllDepartments = (filters) => departmentsWS.getAllDepartments(filters);
const getDepartmentById = (id) => departmentsWS.getDepartmentBId(id);

const addDepartment = async (depObj) => {
    try {
        const depResult = await departmentsWS.addDepartment(depObj);
        if (depObj.manager && depResult._id) {
            try {
                const empResult = await employeesWS.updateEmployee(depObj.manager._id, { departmentid: { _id: depResult._id.toString(), ref: "department" } });
                console.log("addDepartment -> Employee update result: \n", empResult);
            } catch (error) {
                console.log("departmentService -> addDepartment.updateEmployee error. ", error);
            }
        }
        return depResult;
    } catch (error) {
        console.log("departmentService -> addDepartment error. ", error);
        throw error;
    }
}

const updateDepartment = async (id, depObj) => {
    try {
        const depResult = await departmentsWS.updateDepartment(id, depObj);
        if (depObj.manager && id) {
            try {
                const empResult = await employeesWS.updateEmployee(depObj.manager._id, { departmentid: { _id: id, ref: "department" } });
                console.log("updateDepartment -> Employee update result: \n", empResult);
            } catch (error) {
                console.log("departmentService -> updateDepartment.updateEmployee error: ", error);
            }
        }
        return depResult;
    } catch (error) {
        console.log("departmentService -> updateDepartment error. ", error);
        throw error;
    }
}

const deleteDepartment = async (id) => {
    try {
        const department = await getDepartmentById(id);
        if (department && department.manager) {
            try {
                const empResult = await employeesWS.updateEmployee(department.manager._id.toString(), { departmentid: null});
                console.log("deleteDepartment -> Employee update result: \n", empResult);
            } catch (error) {
                console.log("departmentService -> deleteDepartment.updateEmployee error: ", error);
            }
        }
        const mainResult = await departmentsWS.deleteDepartment(id);
        return mainResult;
    } catch (error) {
        console.log("departmentService -> deleteDepartment error:\n ", error);
        throw error;
    }
}

module.exports = {
    getAllDepartments,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment
}