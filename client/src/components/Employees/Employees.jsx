import { memo, useState } from "react"
import { useSelector } from "react-redux";

import Employee from "./Employee";

function Employees() {
  const [employees, setEmployees] = useState(useSelector((state) => state.employeeReducer.employees))

  return (
    <>
      <div style={{padding:'10px 10px 10px 10px'}}>
        <div>Employees</div>
        <table border={2}>
          <thead>
            <tr>
              <th>Name</th>
              <th>START working year</th>
              <th>Department ID</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'left' }}>
            {employees.map(emp => (
              <tr key={emp._id}>
                <Employee employeeInfo={emp} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default memo(Employees)