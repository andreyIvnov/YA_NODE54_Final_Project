const departmentsDB = require('../repositories/departmentsDB');
const employeesWS = require('../repositories/employeesDB');

const getAllDepartments = (filters) => departmentsDB.getAllDepartments(filters);
const getDepartmentById = (id) => departmentsDB.getDepartmentBId(id);

const addDepartment = async (depObj) => {
    try {
        //#region Required fields validation
        if(!depObj.name) return {error: true, description: "Name is a required field"};
        //#endregion
        
        //#region Set field to create
        const depResult = await departmentsDB.addDepartment({
            ...depObj,
            name: depObj.name,
            manager: depObj["departmentid"] ? depObj["departmentid"] : null,
        });
        //#endregion
        
        //#region Set related/just created department to employee, based geted manager field 
        if (depObj.manager && depResult._id) {
            try {
                const empResult = await employeesWS.updateEmployee(depObj.manager._id, { departmentid: { _id: depResult._id.toString(), ref: "department" } });
                console.log("addDepartment -> Employee update result: \n", empResult);
            } catch (error) {
                console.log("departmentService -> addDepartment.updateEmployee error. ", error);
            }
        }
        //#endregion
        
        return depResult;
    } catch (error) {
        console.log("departmentService -> addDepartment error. ", error);
        throw error;
    }
}

const updateDepartment = async (id, depObj) => {
    try {
        const depResult = await departmentsDB.updateDepartment(id, depObj);
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
                const empsResult = await employeesWS.getAllEmployees({
                    "departmentid" : id
                });
                console.log("deleteDepartment -> Employee update result: \n", empsResult);
                if(empsResult && empsResult.length > 0){
                    empsResult.forEach(async (empl) => {
                        await employeesWS.updateEmployee(empl._id.toString(), { departmentid: null});
                    })
                }
            } catch (error) {
                console.log("departmentService -> deleteDepartment.updateEmployee error: ", error);
            }
        }
        const mainResult = await departmentsDB.deleteDepartment(id);
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