import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function AddEditEmployee() {
  const { id } = useParams()
  const [employee, setEmployee] = useState([])

  const inputOnChange = (e) => {
    const { name, value } = e.target

    setEmployee({
      ...employee,
      [name] : value
    })

  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/'+id)
    .then(response => response.json())
    .then(json => {
      // console.log(json)
      setEmployee({
        // console.log(j)
        username : json.username,
        empname : json.name,
        address : json.address.street,
        phone : json.phone
      })
    })

    // return console.log('Clean-Up')
  }, [])
  
  return (
    <React.Fragment>
      <nav className='breadcrumb' aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'><Link to='/employee'>Employee</Link></li>
          <li className='breadcrumb-item active' aria-current='page'>{id != 'new' ? 'Edit' : 'Add'} Employee</li>
        </ol>
      </nav>
      {/* <div className='-header-title'><h5>EMPLOYEE</h5></div> */}
      <div className='card'>
      <div className='card-body'>
      <div className='row'>
        <div className='col'>
          <label htmlFor="empname">Employee Name</label>
          <input onChange={(e) => inputOnChange(e)} type='text' className='form-control form-control-sm' id="empname" name='empname' value={employee.empname || ''} />
          <label htmlFor="address">Address</label>
          <input onChange={(e) => inputOnChange(e)} type='text' className='form-control form-control-sm' id="address" name='address' value={employee.address || ''} />
        </div>
        <div className='col'>
          <label htmlFor="phone">Contact No.</label>
          <input onChange={(e) => inputOnChange(e)} type='text' className='form-control form-control-sm' id='phone' name='phone' value={employee.phone || ''} />
        </div>
      </div>
      </div>
    </div>
    </React.Fragment>
  )
}

export default AddEditEmployee