import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const DepartmentList = props => {
  const { dept, department, setDepartment } = props

  const deleteDepartment = (id) => {
    axios.delete(`http://localhost:3001/department/${id}`)
    .then((res) => {
      console.log(res)
      if(res.status == 200) {
        let list = []
        department.map((val, index) => {
          if(id != val.id) {
            list.push({
              id : val.id,
              deptprefix : val.deptprefix,
              deptcode : val.deptcode,
              deptname : val.deptname
            })
          }
        })
        setDepartment(list)
      }
    })
    .catch((res) => {
      console.log(res)
    })
  }

  return (
    <React.Fragment>
      <tr>
        <td>{dept.deptprefix}</td>
        <td>{dept.deptcode}</td>
        <td>{dept.deptname}</td>
        <td className='text-center'>
          <Link to={`/department/${dept.id}`}>
            <i className="bi bi-pencil-square btn-action-icon" title='Edit'></i>
          </Link>
          &nbsp;
          <i className="bi bi-x-square btn-action-icon" title='Delete' onClick={() => deleteDepartment(dept.id)}></i>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default DepartmentList