import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../../css/TableStyle.css'
// import axios from 'axios'
import axiosConfig from "../../axiosConfig"

import LeavetypeList from './LeavetypeList'
import MyAlert from "../AlertComponent/AlertTemplate"
import SideBar from '../SideNav/SideBar'

const LeavetypeIndex = () => {
  const [leavetype, setLeavetype] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const previousEmployee = useRef(null)
  const [alertShow, setAlertShow] = useState(false)
  const [msgAlert, setMsgAlert] = useState('')

  const deleteLeavetype = (id) => {
    axiosConfig.delete(`/api/leavetypes/${id}`)
    .then((res) => {
      console.log(res)
      if(res.status === 200) {
        // let list = []
        // leavetype.forEach((val, index) => {
        //   if(id !== val.id) {
        //     list.push({
        //       id : val.id,
        //       leavetype : val.leavetype,
        //       leavedescription : val.leavedescription,
        //     })
        //   }
        // })
        // setLeavetype(list)

        setLeavetype(leavetype => leavetype.filter((ltype) => ltype.id !== id))
        setAlertShow(true)
        setMsgAlert(res.data.message)
      }
    })
    .catch((res) => {
      console.log(res)
    })
  }

  const searchLeaveType = (e) => {
    let search_str = e.target.value.toLowerCase()

    let filteredLeave = previousEmployee.current.filter((data) => {
      return data.leavetype.toLowerCase().includes(search_str)
    })

    // if (e.key === "Enter") {
      setLeavetype(filteredLeave)
    // }
  }

  const closeAlert = (status) => {
    setAlertShow(status)
  }

  useEffect(() => {
    axiosConfig.get(`/api/leavetypes`)
    .then(res => {
      console.log(res)
      let list = []
      if(res.status === 200) {
        res.data.forEach(j => {
          list.push({
            id : j.id,
            leavetype : j.leavetype,
            leavedescription : j.leavedescription,
          })
        })
      }
  
      setLeavetype(list)
      previousEmployee.current = list
      setIsloading(false)
    })
    .catch(err => {
      console.log(err)
    })
  
    // return console.log('Clean-Up')
  }, [])

  return (
    <React.Fragment>
      <SideBar />
      <div className="main">
        <div className="container">
          <MyAlert showAlert={alertShow} closeAlert={closeAlert} msgAlert={msgAlert}/>
          <div className='mb-3'>
            <h5>LEAVE TYPE LIST</h5>
          </div>
          <div className='header-btn-div mb-3'>
            <Link to='/leavetypes/create'><button className='btn btn-primary btn-sm header-btn'>NEW</button></Link>
          </div>
          <input type='text' name='search' className="form-control form-control-sm mb-3" placeholder="Search..." onKeyPress={(e) => searchLeaveType(e)} />
          <div className='table-responsive'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th className='sm'>LEAVE TYPE</th>
                  <th className='md'>LEAVE DESCRIPTION</th>
                  <th className='text-center sm'>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  isLoading ? <tr style={{textAlign:'center'}}><td colSpan={5}>loading...</td></tr>
                  : leavetype.map((ltype, index) => { 
                    return (
                      <LeavetypeList 
                        key = {ltype.id} 
                        ltype = {ltype}
                        deleteLeavetype = {deleteLeavetype}
                      />
                    ) 
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LeavetypeIndex