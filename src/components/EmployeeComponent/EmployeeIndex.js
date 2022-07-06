import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../css/TableStyle.css'

function EmployeeIndex() {

  const [employee, setEmployee] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      // console.log(json)
      let list = []
      json.map(j => {
        // console.log(j)
        list.push({
          id : j.id,
          username : j.username,
          name : j.name,
          address : j.address.street,
          phone : j.phone
        })
      })

      setEmployee(list)

    })

    // return console.log('Clean-Up')
  }, [])

  return (
    <React.Fragment>
      <div className='mb-3'>
        <h5>EMPLOYEE LIST</h5>
      </div>
      <div className='table-responsive'>
        <div className='header-btn-div mb-3'>
          <Link to='/employee/new'><button className='btn btn-primary btn-sm header-btn'>NEW</button></Link>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th className='sm'>EMPLOYEE CODE</th>
              <th className='md'>EMPLOYEE NAME</th>
              <th className='lg'>ADDRESS</th>
              <th className='sm'>CONTACT #</th>
              <th className='sm'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
              <td>
                <Link to='/employee/2'>
                  <i className="bi bi-pencil-square btn-action-icon" title='Edit'></i>
                </Link>
                &nbsp;
                <i className="bi bi-x-square btn-action-icon" title='Delete'></i>
              </td>
            </tr> */}
            {
              employee.map((j, index) => {
                // console.log(j);
                return (
                  <tr key={j.id}>
                    <td>{j.username}</td>
                    <td>{j.name}</td>
                    <td>{j.address.street}</td>
                    <td>{j.phone}</td>
                    <td>
                      <Link to={'/employee/'+j.id}>
                        <i className="bi bi-pencil-square btn-action-icon" title='Edit'></i>
                      </Link>
                      &nbsp;
                      <i className="bi bi-x-square btn-action-icon" title='Delete'></i>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default EmployeeIndex