const initialState = {
    departments : []
}
const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DEPARTMENTS':
            return { ...state, departments: action.payload.map(dep => { return { ...dep, status: 'in' } }) }
        case 'ADD_DEPARTMENT':
            return { ...state, departments: [...state.departments, {...action.payload, status: 'new'}] }
        case 'UPDATE_DEPARTMENT':
            return { ...state, departments: state.departments.map(dep => dep.id === action.payload.id ? {...action.payload, status: 'updated'} : dep) }
        case 'REMOVE_DEPARTMENT':
            const deps = state.departments;
            const indexOfDepartment = deps.findIndex(dep => dep.id == action.departments);
            
            if (indexOfDepartment != -1) {
                deps[indexOfDepartment].status = 'deleted'
            }

            return { ...state, departments: deps}
        default:
            return state;
    }
}
export default departmentReducer
