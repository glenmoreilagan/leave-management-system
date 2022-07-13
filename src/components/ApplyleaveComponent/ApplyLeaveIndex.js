import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../../css/TableStyle.css"
import axios from "axios"

import ApplyLeaveList from './ApplyLeaveList'

const ApplyLeaveIndex = () => {
  const [leave, setLeave] = useState([])
  const [isLoading, setIsloading] = useState(true)

  const deleteLeave = (id) => {
    axios.delete(`http://localhost:3001/leaves/${id}`)
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
              empid : val.empid,
              empcode : val.empcode,
              empname : val.empname,
              leavetypeid : val.leavetypeid,
              leavetype : val.leavetype,
              leavedescription : val.leavedescription
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

  useEffect(() => {
    axios.get(`http://localhost:3001/leaves`)
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
            empid : j.empid,
            empcode : j.empcode,
            empname : j.empname,
            leavetypeid : j.leavetypeid,
            leavetype : j.leavetype,
            leavedescription : j.leavedescription
          })
        })
      }

      setLeave(list)
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
                return (
                  <ApplyLeaveList
                    key = {liv.id}
                    leave = {liv}
                    deleteLeave = {deleteLeave}
                  />
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default ApplyLeaveIndex
