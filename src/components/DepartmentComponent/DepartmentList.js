import React from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'

const DepartmentList = props => {
  const { dept, deleteDepartment } = props

  return (
    <React.Fragment>
      <tr>
        <td>{dept.deptprefix}</td>
        <td>{dept.deptcode}</td>
        <td>{dept.deptname}</td>
        <td className='text-center'>
          <Link to={`/departments/${dept.id}`}>
            <i className="bi bi-pencil-square btn-action-icon primary" title='Edit'></i>
          </Link>
          &nbsp;
          <i className="bi bi-x-square-fill btn-action-icon danger" title='Delete' onClick={() => deleteDepartment(dept.id)}></i>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default DepartmentList