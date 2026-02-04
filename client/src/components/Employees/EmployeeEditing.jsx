import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect, useReducer, useState } from 'react';

import { INITIAL_STATE, employeeEditingReducer } from '../../utils/reducers/employeeEditingReducer'

import LookupField from '../LookupField'

function EmployeeEditing() {
  const [state, dispatch] = useReducer(employeeEditingReducer, INITIAL_STATE)
  const [defaultDept, setDefaultDept] = useState({})
  
  const obj = useParams();
  const employees = useSelector((state) => state.employeeReducer.employees);
  const departments = useSelector((state) => state.departmentReducer.departments);
  const shifts = useSelector((state) => state.shiftReducer.shifts);

  const initAllData = () => {
    dispatch({
      type: "INIT_DEPARTMENT_OPTIONS", payload: departments.map((dep) => {
        return {
          id: dep._id,
          label: dep.name,
        }
      })
    })

    const indexOfCurrentEmpl = employees.findIndex(emp => emp._id === obj.id)
    if (indexOfCurrentEmpl != -1) {
      dispatch({ type: "INIT_CURRENT_EMPLOYEE", payload: employees[indexOfCurrentEmpl] })
      if (employees[indexOfCurrentEmpl].departmentid ) {
        const deptOfEmployee = state.departmentOptions.find(d => d.id === employees[indexOfCurrentEmpl].departmentid);
        setDefaultDept(deptOfEmployee);
      }
    }
    else
      console.warn("NO_EMPLOYEE: ", `There is no employee with ID: ${obj.id}`)
  }

  useEffect(() => {
    initAllData();
  }, [])

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