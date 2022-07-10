import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../css/TableStyle.css'
import axios from 'axios'


import EmployeeList from './EmployeeList'

const EmployeeIndex = () => {

  const [employee, setEmployee] = useState([])
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:3001/employee`)
    .then(res => {
      console.log(res)
      let list = []
      if(res.status == 200) {
        res.data.map(j => {
          list.push({
            id : j.id,
            empname : j.empname,
            address : j.address,
            phone : j.phone
          })
        })
      }

      setEmployee(list)
      setIsloading(false)
    })
    .catch(err => {
      console.log(err)
    })

    // return console.log('Clean-Up')
  }, [])

  return (
    <React.Fragment>
      <div className='mb-3'>
        <h5>EMPLOYEE LIST</h5>
      </div>
      <div className='header-btn-div mb-3'>
        <Link to='/employee/create'><button className='btn btn-primary btn-sm header-btn'>NEW</button></Link>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th className='sm'>EMPLOYEE CODE</th>
              <th className='md'>EMPLOYEE NAME</th>
              <th className='lg'>ADDRESS</th>
              <th className='sm'>CONTACT #</th>
              <th className='text-center sm'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading ? <tr style={{textAlign:'center'}}><td colSpan={5}>loading...</td></tr>
              : employee.map((emp, index) => { return (<EmployeeList key={emp.id} emp={emp} employee={employee} setEmployee={setEmployee} />) })
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default EmployeeIndex