const initialState = {
    employees : []
}
const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EMPLOYEES':
            return { ...state, employees: action.payload.map(emp => { return { ...emp, status: 'in' } }) }
        case 'ADD_EMPLOYEE':
            return { ...state, employees: [...state.employees, {...action.payload, status: 'new'}] }
        case 'UPDATE_EMPLOYEE':
            return { ...state, employees: state.employees.map(emp => emp.id === action.payload.id ? {...action.payload, status: 'updated'} : emp) }
        case 'REMOVE_EMPLOYEE':
            const emps = state.employees;
            const indexOfUEmplyee = emps.findIndex(emp => emp.id == action.employees);
            
            if (indexOfUEmplyee != -1) {
                emps[indexOfUEmplyee].status = 'deleted'
            }

            return { ...state, employees: emps}
        default:
            return state;
    }
}
export default employeeReducer
