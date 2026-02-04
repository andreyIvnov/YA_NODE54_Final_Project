import { memo } from "react"
import { Link } from "react-router-dom"

function Employee({ employeeInfo }) {
    return (
        <>
            <td><Link to={employeeInfo._id}>{employeeInfo.firstname ? employeeInfo.firstname : "NoName"} {employeeInfo.lastname}</Link></td>
            <td >{employeeInfo.startworkyear}</td>
            <td>{employeeInfo.departmentid}</td>
        </>
    )
}

export default memo(Employee)