import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../../css/TableStyle.css'
import axios from 'axios'
import axiosConfig from "../../axiosConfig"

import DepartmentList from './DepartmentList'

const DepartmentIndex = () => {
  const [department, setDepartment] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const previousDepartment = useRef(null)

  const deleteDepartment = (id) => {
    axiosConfig.delete(`/api/departments/${id}`)
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

  const searchDepartment = (e) => {
    let search_str = e.target.value.toLowerCase()

    let filteredLeave = previousDepartment.current.filter((data) => {
      return data.deptcode.toLowerCase().includes(search_str) || data.deptname.toLowerCase().includes(search_str)
    })

    // if (e.key === "Enter") {
      setDepartment(filteredLeave)
    // }
  }

  useEffect(() => {
    axiosConfig.get(`/api/departments`)
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
      previousDepartment.current = list
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
        <Link to='/departments/create'><button className='btn btn-primary btn-sm header-btn'>NEW</button></Link>
      </div>
      <input type='text' name='search' className="form-control form-control-sm mb-3" placeholder="Search..." onKeyPress={(e) => searchDepartment(e)} />
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
              : department.map((dept, index) => { 
                return (
                  <DepartmentList 
                    key = {dept.id} 
                    dept = {dept} 
                    deleteDepartment = {deleteDepartment}
                  />
                ) 
              })
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default DepartmentIndex