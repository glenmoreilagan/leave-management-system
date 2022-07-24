import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import axios from "axios"
import axiosConfig from "../../axiosConfig"

import Breadcrumb from '../BreadcrumbComponent/Breadcrumb'
import MyAlert from "../AlertComponent/AlertTemplate"
import SideBar from "../SideNav/SideBar"

const AddEditAdmin = () => {
  const { id } = useParams()
  const [admin, setAdmin] = useState([])
  const [alertShow, setAlertShow] = useState(false)
  const [msgAlert, setMsgAlert] = useState("")

  const inputOnChange = (e) => {
    const { name, value } = e.target

    setAdmin({
      ...admin,
      [name]: value,
    })
  }

  const saveAdmin = () => {
    if (id === "create") {
      axiosConfig.post(`/api/admins`, admin)
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
      axiosConfig.put(`/api/admins/${id}`, admin)
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

  const closeAlert = (status) => {
    setAlertShow(status)
  }

  useEffect(() => {
    if (id !== "create") {
      axiosConfig.get(`/api/admins/${id}`)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setAdmin({
            name: res.data.name,
            email: res.data.email,
            password: res.data.password,
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
      <SideBar />
      <div className="main">
        <div className="container">
          <MyAlert showAlert={alertShow} closeAlert={closeAlert} msgAlert={msgAlert} />
          <Breadcrumb linkTo="admins" label="Admin" />
          {/* <div className='-header-title'><h5>ADMIN</h5></div> */}
          <div className="card">
            <div className="card-body">
              <div className="header-btn-div mb-3">
                <button
                  className="btn btn-primary btn-sm header-btn"
                  onClick={saveAdmin}
                >
                  SAVE
                </button>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={(e) => inputOnChange(e)}
                    type="text"
                    className="form-control form-control-sm"
                    id="name"
                    name="name"
                    value={admin.name || ""}
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={(e) => inputOnChange(e)}
                    type="text"
                    className="form-control form-control-sm"
                    id="email"
                    name="email"
                    value={admin.email || ""}
                  />
                  <label htmlFor="email">Password</label>
                  <input
                    onChange={(e) => inputOnChange(e)}
                    type="password"
                    className="form-control form-control-sm"
                    id="password"
                    name="password"
                    value={admin.password || ""}
                  />
                </div>
                <div className="col">
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddEditAdmin
