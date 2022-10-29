import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import axios from "axios"
import axiosConfig from "../../axiosConfig"

import Card from "react-bootstrap/Card"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import Breadcrumb from "../BreadcrumbComponent/Breadcrumb"
import MyAlert from "../AlertComponent/AlertTemplate"
import SideBar from "../SideNav/SideBar"
import LookupDepartment from "../LookupComponent/LookupDepartment"

const AddEditEmployee = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState([])
  const [alertShow, setAlertShow] = useState(false)
  const [msgAlert, setMsgAlert] = useState('')

  const [file, setFile] = useState()
  const [fileName, setFileName] = useState('')

  // const [selectDepartment, setSelectDepartment] = useState()

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
    formData.append("email", employee.email)
    formData.append("password", employee.password)
    formData.append("dept_id", employee.dept_id)

    let config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    // console.log(file)
    // for (var pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }
    // return
    if (id === "create") {
      axiosConfig
        .post("/api/employees", formData, config)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            setAlertShow(true)
            setMsgAlert(res.data.message)
          }
        })
        .catch((res) => {
          console.log(res)
        })
    } else {
      formData.append("_method", "PUT")
      axiosConfig
        .post(`/api/employees/${id}`, formData)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            setAlertShow(true)
            setMsgAlert(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const selectPic = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  const closeAlert = (status) => {
    setAlertShow(status)
  }

  useEffect(() => {
    if (id !== "create") {
      axiosConfig
        .get(`/api/employees/${id}`)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            setEmployee({
              empname: res.data[0].empname,
              address: res.data[0].address,
              phone: res.data[0].phone,
              email: res.data[0].email,
              dept_id: res.data[0].dept_id,
              deptname: res.data[0].deptname,
              image: res.data[0].image,
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    // return console.log('Clean-Up')
  }, [id])

  const mystyle = {
    employee_profile : {
      width: '150px',
      height: '150px',
    }
  };

  return (
    <React.Fragment>
      <SideBar />
      <div className="main">
        <div className="container">
          <MyAlert showAlert={alertShow} closeAlert={closeAlert} msgAlert={msgAlert}/>
          <Breadcrumb linkTo="employees" label="Employee" />
          {/* <div className='-header-title'><h5>EMPLOYEE</h5></div> */}
          <Card body>
            <div className="header-btn-div mb-3">
              <Button 
                onClick={saveEmployee}
                variant="primary" 
                className="header-btn"
                size="sm"
              >
                SAVE
              </Button>
            </div>
            <div className="row">
              <div className="col">
                <Form.Label htmlFor="empname">Employee Name</Form.Label>
                <Form.Control onChange={(e) => inputOnChange(e)} type="text" id="empname" name="empname" value={employee.empname || ""} size='sm' />
                <Form.Label htmlFor="address">Address</Form.Label>
                <Form.Control onChange={(e) => inputOnChange(e)} type="text" id="address" name="address" value={employee.address || ""} size='sm' as='textarea' />
                <Form.Label htmlFor="phone">Contact No.</Form.Label>
                <Form.Control onChange={(e) => inputOnChange(e)} type="text" id="phone" name="phone" value={employee.phone || ""} size='sm' />
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control onChange={(e) => inputOnChange(e)} type="text" id="email" name="email" value={employee.email || ""} size='sm' />
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control onChange={(e) => inputOnChange(e)} type="password" id="password" name="password" value={employee.password || ""} size='sm' />
                <Form.Label htmlFor="file">Picture</Form.Label>
                <Form.Control onChange={(e) => selectPic(e)} type="file" id="file" name="file" size='sm' />

                <label htmlFor="deptname">Department</label>
                <div className="input-group">
                  <input 
                    name="deptname"
                    type="text" 
                    className="form-control form-control-sm" 
                    id="deptname"
                    onChange={(e) => inputOnChange(e)}
                    value={employee.deptname || ""}
                    readOnly
                  />
                  <button 
                    className="btn btn-primary btn-sm" 
                    type="button" 
                    data-bs-toggle="modal" 
                    data-bs-target="#LookupDepartment"
                  >
                    <i className="bi bi-list"></i>
                  </button>
                </div>
              </div>
              <div className="col">
                {
                  id !== 'create' ? <img style={mystyle.employee_profile} src={employee.image ? `http://localhost:8000/${employee.image}` : ''} alt="Employee Profile" /> : ''
                }
              </div>
            </div>
          </Card>
        </div>
      </div>
      <LookupDepartment employee={employee} setEmployee={setEmployee} />
    </React.Fragment>
  )
}

export default AddEditEmployee
