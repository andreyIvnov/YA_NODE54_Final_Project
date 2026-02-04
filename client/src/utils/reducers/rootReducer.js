import  { combineReducers } from 'redux';

//Out
import userReducer from './userReducer';
import employeeReducer from './employeeReducer';
import departmentReducer from './departmentReducer';
import shiftReducer from './shiftReducer';

const rootReducer = combineReducers({
    userReducer: userReducer,
    employeeReducer: employeeReducer,
    departmentReducer: departmentReducer,
    shiftReducer: shiftReducer,
});
export default rootReducer;