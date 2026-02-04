const initialState = {
    shifts : []
}
const shiftReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SHIFTS':
            return { ...state, shifts: action.payload.map(shift => { return { ...shift, status: 'in' } }) }
        case 'ADD_SHIFT':
            return { ...state, shifts: [...state.shifts, {...action.payload, status: 'new'}] }
        case 'UPDATE_SHIFT':
            return { ...state, shifts: state.shifts.map(shift => shift.id === action.payload.id ? {...action.payload, status: 'updated'} : shift) }
        case 'REMOVE_SHIFT':
            const shifts = state.shifts;
            const indexOfShift = shifts.findIndex(shift => shift.id == action.shifts);
            
            if (indexOfShift != -1) {
                shifts[indexOfShift].status = 'deleted'
            }

            return { ...state, shifts: shifts}
        default:
            return state;
    }
}
export default shiftReducer
