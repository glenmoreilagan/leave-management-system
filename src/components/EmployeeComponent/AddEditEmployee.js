import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

import Breadcrumb from '../BreadcrumbComponent/Breadcrumb'

const AddEditEmployee = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState([])

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const inputOnChange = (e) => {
    const { name, value } = e.target

    setEmployee({
      ...employee,
      [name]: value,
    })
  }

  const saveEmployee = () => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("fileName", fileName)
    formData.append("empname", employee.empname)
    formData.append("address", employee.address)
    formData.append("phone", employee.phone)

    let config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    if (id === "create") {
      axios.post("http://localhost:3001/employees/store", formData, config)
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.log(res)
      })
    } else {
      axios.put(`http://localhost:3001/employees/${id}`, employee)
      .then((res) => {
        console.log(res)
        // if (res.status == 200) {
        //   setEmployee({
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

  const selectPic = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  useEffect(() => {
    if (id != "create") {
      axios.get(`http://localhost:3001/employees/${id}`)
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          setEmployee({
            empname: res.data[0].empname,
            address: res.data[0].address,
            phone: res.data[0].phone,
            image: res.data[0].image,
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
      <Breadcrumb linkTo="employees" label="Employee" />
      {/* <div className='-header-title'><h5>EMPLOYEE</h5></div> */}
      <div className="card">
        <div className="card-body">
          <div className="header-btn-div mb-3">
            <button
              className="btn btn-primary btn-sm header-btn"
              onClick={saveEmployee}
            >
              SAVE
            </button>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="empname">Employee Name</label>
              <input
                onChange={(e) => inputOnChange(e)}
                type="text"
                className="form-control form-control-sm"
                id="empname"
                name="empname"
                value={employee.empname || ""}
              />
              <label htmlFor="address">Address</label>
              <textarea
                onChange={(e) => inputOnChange(e)}
                type="text"
                className="form-control form-control-sm"
                id="address"
                name="address"
                value={employee.address || ""}
              />
              <label htmlFor="phone">Contact No.</label>
              <input
                onChange={(e) => inputOnChange(e)}
                type="text"
                className="form-control form-control-sm"
                id="phone"
                name="phone"
                value={employee.phone || ""}
              />
              
              <label htmlFor="file">Picture</label>
              <input
                onChange={(e) => selectPic(e)}
                type="file"
                className="form-control form-control-sm"
                id="file"
                name="file"
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

export default AddEditEmployee
