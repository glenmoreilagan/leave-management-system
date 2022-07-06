import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeList = props => {
  const { emp } = props
  return (
    <React.Fragment>
      <tr>
        <td>{emp.username}</td>
        <td>{emp.name}</td>
        <td>{emp.address.street}</td>
        <td>{emp.phone}</td>
        <td>
          <Link to={`/employee/${emp.id}`}>
            <i className="bi bi-pencil-square btn-action-icon" title='Edit'></i>
          </Link>
          &nbsp;
          <i className="bi bi-x-square btn-action-icon" title='Delete'></i>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default EmployeeList