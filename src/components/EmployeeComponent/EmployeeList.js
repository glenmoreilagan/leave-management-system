import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const EmployeeList = props => {
  const { emp, employee, setEmployee } = props

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/employee/${id}`)
    .then((res) => {
      console.log(res)
      if(res.status == 200) {
        let list = []
        employee.map((val, index) => {
          if(id != val.id) {
            list.push({
              id : val.id,
              empname : val.empname,
              address : val.address,
              phone : val.phone
            })
          }
        })
        setEmployee(list)
      }
    })
    .catch((res) => {
      console.log(res)
    })
  }

  return (
    <React.Fragment>
      <tr>
        <td>{emp.empcode}</td>
        <td>{emp.empname}</td>
        <td>{emp.address}</td>
        <td>{emp.phone}</td>
        <td>
          <Link to={`/employee/${emp.id}/edit`}>
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