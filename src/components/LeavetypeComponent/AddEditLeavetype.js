import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import axios from "axios"
import axiosConfig from "../../axiosConfig"

import Breadcrumb from '../BreadcrumbComponent/Breadcrumb'
import MyAlert from "../AlertComponent/AlertTemplate"
import SideBar from "../SideNav/SideBar"

const AddEditLeavetype = () => {
  const { id } = useParams()
  const [leavetype, setLeavetype] = useState([])
  const [alertShow, setAlertShow] = useState(false)
  const [msgAlert, setMsgAlert] = useState('')

  const inputOnChange = (e) => {
    const { name, value } = e.target

    setLeavetype({
      ...leavetype,
      [name]: value,
    })
  }

  const saveLeavetype = () => {
    if (id === "create") {
      axiosConfig.post(`/api/leavetypes`, leavetype)
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
      setLeavetype({
        ...leavetype,
        _method : 'PUT'
      })
      axiosConfig.put(`/api/leavetypes/${id}`, leavetype)
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
      axiosConfig.get(`/api/leavetypes/${id}`)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setLeavetype({
            leavetype: res.data.leavetype,
            leavedescription: res.data.leavedescription,
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
          <MyAlert showAlert={alertShow} closeAlert={closeAlert} msgAlert={msgAlert}/>
          <Breadcrumb linkTo="leavetypes" label="Leave Type" />
          {/* <div className='-header-title'><h5>DEPARTMENT</h5></div> */}
          <div className="card">
            <div className="card-body">
              <div className="header-btn-div mb-3">
                <button
                  className="btn btn-primary btn-sm header-btn"
                  onClick={saveLeavetype}
                >
                  SAVE
                </button>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="leavetype">Leave Type</label>
                  <input
                    onChange={(e) => inputOnChange(e)}
                    type="text"
                    className="form-control form-control-sm"
                    id="leavetype"
                    name="leavetype"
                    value={leavetype.leavetype || ""}
                  />
                  <label htmlFor="leavedescription">Leave Description</label>
                  <textarea
                    onChange={(e) => inputOnChange(e)}
                    type="text"
                    className="form-control form-control-sm"
                    id="leavedescription"
                    name="leavedescription"
                    value={leavetype.leavedescription || ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddEditLeavetype
