import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "../../css/TableStyle.css"
import axios from "axios"
import axiosConfig from "../../axiosConfig"

import ApplyLeaveList from './ApplyLeaveList'

const ApplyLeaveIndex = () => {
  const [leave, setLeave] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const previousLeave = useRef(null);

  const deleteLeave = (id) => {
    axiosConfig.delete(`/api/leaves/${id}`)
    .then((res) => {
      console.log(res)
      if (res.status == 200) {
        let list = []
        leave.map((val, index) => {
          if (id != val.id) {
            list.push({
              id: val.id,
              start_date : val.start_date,
              end_date : val.end_date,
              reason : val.reason,
              emp_id : val.emp_id,
              empcode : val.employee.empcode,
              empname : val.employee.empname,
              leavetype_id : val.leavetype_id,
              leavetype : val.leavetype.leavetype,
              leavedescription : val.leavetype.leavedescription
            })
          }
        })
        setLeave(list)
      }
    })
    .catch((res) => {
      console.log(res)
    })
  }

  const searchLeave = (e) => {
    let search_str = e.target.value.toLowerCase();

    let filteredLeave = previousLeave.current.filter((data) => {
      return data.empcode.toLowerCase().includes(search_str) || data.empname.toLowerCase().includes(search_str)
    })

    if (e.key === "Enter") {
      setLeave(filteredLeave)
    }
  }

  useEffect(() => {
    axiosConfig.get(`/api/leaves`)
    .then((res) => {
      console.log(res)
      let list = []
      if (res.status == 200) {
        res.data.map((j) => {
          list.push({
            id: j.id,
            start_date : j.start_date,
            end_date : j.end_date,
            reason : j.reason,
            emp_id : j.emp_id,
            empcode : j.employee !== null ? j.employee.empcode : '',
            empname : j.employee !== null ? j.employee.empname : '',
            leavetype_id : j.leavetype_id,
            leavetype : j.leavetype !== null ? j.leavetype.leavetype : '',
            leavedescription : j.leavetype !== null ? j.leavetype.leavedescription : ''
          })
        })
      }

      setLeave(list)
      previousLeave.current = list;
      setIsloading(false)
    })
    .catch((err) => {
      console.log(err)
    })

    // return console.log('Clean-Up')
  }, [])

  return (
    <React.Fragment>
      <div className="mb-3">
        <h5>LEAVE LIST</h5>
      </div>
      <div className="header-btn-div mb-3">
        <Link to="/applyleaves/create">
          <button className="btn btn-primary btn-sm header-btn">NEW</button>
        </Link>
      </div>
      <input type='text' name='search' className="form-control form-control-sm mb-3" placeholder="Search..." onKeyPress={(e) => searchLeave(e)} />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="md">EMPLOYEE NAME</th>
              <th className="md">LEAVE TYPE</th>
              <th className="md">REASON</th>
              <th className="md">LEAVE DATE</th>
              <th className="text-center sm">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr style={{ textAlign: "center" }}>
                <td colSpan={5}>loading...</td>
              </tr>
            ) : (
              leave.map((liv, index) => {
                return <ApplyLeaveList key = {liv.id} leave = {liv} deleteLeave = {deleteLeave} />
              })
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default ApplyLeaveIndex
