const INITIAL_STATE = {
    currentEmployee: {},
    departmentOptions: [],
}

const employeeEditingReducer = (state, action) => {
    switch (action.type) {
        case "INIT_CURRENT_EMPLOYEE":
            return { ...state, currentEmployee: action.payload };

        case "INIT_DEPARTMENT_OPTIONS":
            return { ...state, departmentOptions: action.payload };

        default:
            return state;
    }
}

export { employeeEditingReducer, INITIAL_STATE }