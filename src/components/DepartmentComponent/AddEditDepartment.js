import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import axiosConfig from "../../axiosConfig"

import Breadcrumb from '../BreadcrumbComponent/Breadcrumb'

const AddEditDepartment = () => {
  const { id } = useParams()
  const [department, setDepartment] = useState([])

  const inputOnChange = (e) => {
    const { name, value } = e.target

    setDepartment({
      ...department,
      [name]: value,
    })
  }

  const saveDepartment = () => {
    if (id === "create") {
      axiosConfig.post(`/departments/create`, department)
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.log(res)
      })
    } else {
      axiosConfig.put(`/department/${id}`, department)
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
      axiosConfig.get(`/departments/${id}`)
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          setDepartment({
            deptprefix: res.data[0].deptprefix,
            deptcode: res.data[0].deptcode,
            deptname: res.data[0].deptname,
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
      <Breadcrumb linkTo="departments" label="Department" />
      {/* <div className='-header-title'><h5>DEPARTMENT</h5></div> */}
      <div className="card">
        <div className="card-body">
          <div className="header-btn-div mb-3">
            <button
              className="btn btn-primary btn-sm header-btn"
              onClick={saveDepartment}
            >
              SAVE
            </button>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="deptprefix">Department Prefix</label>
              <input
                onChange={(e) => inputOnChange(e)}
                type="text"
                className="form-control form-control-sm"
                id="deptprefix"
                name="deptprefix"
                value={department.deptprefix || ""}
              />
              <label htmlFor="deptcode">Department Code</label>
              <input
                onChange={(e) => inputOnChange(e)}
                type="text"
                className="form-control form-control-sm"
                id="deptcode"
                name="deptcode"
                value={department.deptcode || ""}
              />
              <label htmlFor="deptname">Department Name</label>
              <input
                onChange={(e) => inputOnChange(e)}
                type="text"
                className="form-control form-control-sm"
                id="deptname"
                name="deptname"
                value={department.deptname || ""}
              />
            </div>
            <div className="col">
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddEditDepartment
