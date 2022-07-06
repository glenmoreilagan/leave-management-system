import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function AddEditEmployee() {
  const { id } = useParams()
  const [employee, setEmployee] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/'+id)
    .then(response => response.json())
    .then(json => {
      // console.log(json)
      setEmployee({
        // console.log(j)
        username : json.username,
        name : json.name,
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
      <h5>EMPLOYEE</h5>
    </React.Fragment>
  )
}

export default AddEditEmployee