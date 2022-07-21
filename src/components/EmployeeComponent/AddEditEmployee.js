import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import axios from "axios"
import axiosConfig from "../../axiosConfig"

import Card from "react-bootstrap/Card"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import Breadcrumb from "../BreadcrumbComponent/Breadcrumb"
import MyAlert from "../AlertComponent/AlertTemplate"

const AddEditEmployee = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState([])
  const [alertShow, setAlertShow] = useState(false)
  const [msgAlert, setMsgAlert] = useState('')

  const [file, setFile] = useState()
  const [fileName, setFileName] = useState('')

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
        "content-type": "multipart/form-data",
      },
    }

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
              empname: res.data.empname,
              address: res.data.address,
              phone: res.data.phone,
              image: res.data.image,
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    // return console.log('Clean-Up')
  }, [id])

  return (
    <React.Fragment>
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
              <Form.Label htmlFor="file">Picture</Form.Label>
              <Form.Control onChange={(e) => selectPic(e)} type="file" id="file" name="file" size='sm' />
              </div>
              <div className="col">
                <img src={employee.image ??`http://localhost:3001/images/${employee.image}`} alt="Employee Profile" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddEditEmployee
