import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import dateFormat from 'dateformat'

import Breadcrumb from '../BreadcrumbComponent/Breadcrumb'
import LookupLeaveType from "../LookupComponent/LookupLeaveType"

const AddEditApplyLeave = () => {
  const { id } = useParams()
  const [leave, setLeave] = useState({
    empid : 3
  })

  const inputOnChange = (e) => {
    const { name, value } = e.target

    setLeave({
      ...leave,
      [name]: value,
    })
  }

  const saveLeave = () => {
    if (id === "create") {
      axios.post("http://localhost:3001/leaves/create", leave)
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.log(res)
      })
    } else {
      axios.put(`http://localhost:3001/leaves/${id}`, leave)
      .then((res) => {
        console.log(res)
        // if (res.status == 200) {
        //   setDepartment({
        //     empname: res.data[0].empname,
        //     address: res.data[0].address,
        //     phone: res.data[0].phone,
        //   })
        // }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  useEffect(() => {
    if (id != "create") {
      axios.get(`http://localhost:3001/leaves/${id}`)
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          setLeave({
            empid: res.data[0].empid,
            leavetypeid: res.data[0].leavetypeid,
            leavetype: res.data[0].leavetype,
            reason: res.data[0].reason,
            start_date: dateFormat(res.data[0].start_date, "yyyy-mm-dd"),
            end_date: dateFormat(res.data[0].end_date, "yyyy-mm-dd"),
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }

    // return console.log('Clean-Up')
  }, [])

  return (
    <React.Fragment>
      <Breadcrumb linkTo="applyleaves" label="Apply Leave" />
      {/* <div className='-header-title'><h5>APPLY LEAVE</h5></div> */}
      <div className="card">
        <div className="card-body">
          <div className="header-btn-div mb-3">
            <button
              className="btn btn-primary btn-sm header-btn"
              onClick={saveLeave}
            >
              SAVE
            </button>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="start_date">Start Date</label>
              <input
                name="start_date"
                type="date"
                className="form-control form-control-sm"
                id="start_date"
                onChange={(e) => inputOnChange(e)}
                value={leave.start_date || ""}
              />
              <label htmlFor="end_date">End Date</label>
              <input
                name="end_date"
                type="date"
                className="form-control form-control-sm"
                id="end_date"
                onChange={(e) => inputOnChange(e)}
                value={leave.end_date || ""}
              />
              <label htmlFor="leavetype">Leave Type</label>
              <div className="input-group">
                <input 
                  name="leavetype"
                  type="text" 
                  className="form-control form-control-sm" 
                  id="leavetype"
                  onChange={(e) => inputOnChange(e)}
                  value={leave.leavetype || ""}
                  readOnly
                />
                <button 
                  className="btn btn-primary btn-sm" 
                  type="button" 
                  data-bs-toggle="modal" 
                  data-bs-target="#LookupLeaveType"
                >
                  <i className="bi bi-list"></i>
                </button>
              </div>
              <label htmlFor="reason">Reason</label>
              <textarea
                name="reason"
                type="text"
                className="form-control form-control-sm"
                id="reason"
                onChange={(e) => inputOnChange(e)}
                value={leave.reason || ""}
              />
            </div>
            <div className="col">
              {/*  */}
            </div>
          </div>
        </div>
      </div>

      <LookupLeaveType leave={leave} setLeave={setLeave} />
    </React.Fragment>
  )
}

export default AddEditApplyLeave
