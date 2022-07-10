import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../css/TableStyle.css'
import axios from 'axios'

import DepartmentList from './DepartmentList'

const DepartmentIndex = () => {
  const [department, setDepartment] = useState([])
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:3001/department`)
    .then(res => {
      console.log(res)
      let list = []
      if(res.status == 200) {
        res.data.map(j => {
          list.push({
            id : j.id,
            deptprefix : j.deptprefix,
            deptcode : j.deptcode,
            deptname : j.deptname
          })
        })
      }

      setDepartment(list)
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
        <h5>DEPARTMENT LIST</h5>
      </div>
      <div className='header-btn-div mb-3'>
        <Link to='/department/create'><button className='btn btn-primary btn-sm header-btn'>NEW</button></Link>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th className='sm'>DEPARTMENT PREFIX</th>
              <th className='md'>DEPARTMENT CODE</th>
              <th className='lg'>DEPARTMENT NAME</th>
              <th className='text-center sm'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading ? <tr style={{textAlign:'center'}}><td colSpan={5}>loading...</td></tr>
              : department.map((dept, index) => { return (<DepartmentList key={dept.id} dept={dept} department={department} setDepartment={setDepartment} />) })
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default DepartmentIndex