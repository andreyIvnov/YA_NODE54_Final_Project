import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect, useReducer, useState } from 'react';

import { INITIAL_STATE, employeeEditingReducer } from '../../utils/reducers/employeeEditingReducer'

import LookupField from '../LookupField'

function EmployeeEditing() {
  const [state, dispatch] = useReducer(employeeEditingReducer, INITIAL_STATE)
  // defaultDept should be null when not set so LookupField shows the input
  const [defaultDept, setDefaultDept] = useState(null)
  
  const obj = useParams();
  const employees = useSelector((state) => state.employeeReducer.employees);
  const departments = useSelector((state) => state.departmentReducer.departments);
  // const shifts = useSelector((state) => state.shiftReducer.shifts);

  const initAllData = () => {
    if (!departments || departments.length === 0 || !employees || employees.length === 0) return;

    const depOptions = departments.map((dep) => ({ id: dep._id, label: dep.name }));
    dispatch({ type: "INIT_DEPARTMENT_OPTIONS", payload: depOptions });

    const currentEmployee = employees.find(emp => emp._1 === obj.id || emp._id === obj.id);
    if (currentEmployee) {
      dispatch({ type: "INIT_CURRENT_EMPLOYEE", payload: currentEmployee });
      if (currentEmployee.departmentid) {
        const deptOfEmployee = depOptions.find(d => d.id === currentEmployee.departmentid);
        setDefaultDept(deptOfEmployee || null);
      }
    } else {
      console.warn("NO_EMPLOYEE: ", `There is no employee with ID: ${obj.id}`)
    }
  }

  // re-run when departments or employees change (they often come from async Redux actions)
  useEffect(() => {
    initAllData();
  }, [departments, employees, obj.id])

  const saveChanges = () => {
    
  }


  return (
    <>
      <div style={{textAlign:'left', padding:'10px 10px 10px 10px'}}>
        <strong>First name: </strong> <input type="text" name="firstname" defaultValue={state.currentEmployee.firstname}/><br />
        <strong>Last name: </strong><input type="text" name="lastname" defaultValue={state.currentEmployee.lastname}/> <br />
        <strong>Start in: </strong><input type="number" name="startworkyear" defaultValue={state.currentEmployee.startworkyear}/> <br /><br />
         <strong>Department: </strong>
         
         <LookupField
          options={state.departmentOptions}
          defaultValue={defaultDept}
          entityName="departments"
        />

        <button onClick={saveChanges}>Save</button>
      </div>
    </>
  )
}

export default EmployeeEditing