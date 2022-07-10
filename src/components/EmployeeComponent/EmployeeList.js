import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const EmployeeList = props => {
  const { emp, deleteEmployee } = props

  return (
    <React.Fragment>
      <tr>
        <td>{emp.empcode}</td>
        <td>{emp.empname}</td>
        <td>{emp.address}</td>
        <td>{emp.phone}</td>
        <td className='text-center'>
          <Link to={`/employees/${emp.id}`}>
            <i className="bi bi-pencil-square btn-action-icon" title='Edit'></i>
          </Link>
          &nbsp;
          <i className="bi bi-x-square btn-action-icon" title='Delete' onClick={() => deleteEmployee(emp.id)}></i>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default EmployeeList