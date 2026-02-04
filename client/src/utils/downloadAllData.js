import { getDepartments } from "../services/DepartmentsAPI";
import { getEmployees } from "../services/EmployeesAPI"
import { getShifts } from "../services/ShiftsAPI";

async function downloadAllData ( dispatch ) {
    
    try {
        const { data: employeesData } = await getEmployees();
        if (employeesData && employeesData.length > 0) {
            dispatch({ type: "SET_EMPLOYEES", payload: employeesData })
        }
    } catch (error) {
        console.error("Error on getting employees: ", error);
        if (error.response?.data?.message) {
            console.error("Inner exception: ", error.response.data.message)
            if (error.response.data.message.includes("jwt expired")) {
                sessionStorage.removeItem("token");
                return "jwt expired";
            }
        }
    }

    try {
        const { data: departmentsData } = await getDepartments();
        if (departmentsData && departmentsData.length > 0) {
            dispatch({ type: "SET_DEPARTMENTS", payload: departmentsData })
        }
    } catch (error) {
        console.error("Error on getting departments: ", error);
        if (error.response?.data?.message) {
            console.error("Inner exception: ", error.response.data.message)
            if (error.response.data.message.includes("jwt expired")) {
                sessionStorage.removeItem("token");
                return "jwt expired";
            }
        }
    }

    try {
        const { data: shiftsData } = await getShifts();
        if (shiftsData && shiftsData.length > 0) {
            dispatch({ type: "SET_SHIFTS", payload: shiftsData })
        }
    } catch (error) {
        console.error("Error on getting departments: ", error);
        if (error.response?.data?.message) {
            console.error("Inner exception: ", error.response.data.message)
            if (error.response.data.message.includes("jwt expired")) {
                sessionStorage.removeItem("token");
                return "jwt expired";
            }
        }
    }
}

export default downloadAllData;