import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "../../css/TableStyle.css"
// import axios from "axios"
import axiosConfig from "../../axiosConfig"


import AdminList from "./AdminList"
import MyAlert from "../AlertComponent/AlertTemplate"
import SideBar from "../SideNav/SideBar"

const AdminIndex = () => {
  const [admin, setAdmin] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const previousAdmin = useRef(null)
  const [alertShow, setAlertShow] = useState(false)
  const [msgAlert, setMsgAlert] = useState("")

  const deleteAdmin = (id) => {
    axiosConfig
    .delete(`/api/admins/${id}`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        setAdmin(leave => admin.filter((admin) => admin.id !== id))
        
        setAlertShow(true)
        setMsgAlert(res.data.message)
      }
    })
    .catch((res) => {
      console.log(res)
    })
  }

  const searchAdmin = (e) => {
    let search_str = e.target.value.toLowerCase()

    let filteredLeave = previousAdmin.current.filter((data) => {
      return data.name.toLowerCase().includes(search_str) || data.name.toLowerCase().includes(search_str)
    })

    // if (e.key === "Enter") {
      setAdmin(filteredLeave)
    // }
  }

  const closeAlert = (status) => {
    setAlertShow(status)
  }

  useEffect(() => {
    axiosConfig.get(`/api/admins`)
    .then((res) => {
      console.log(res)
      let list = []
      if (res.status === 200) {
        res.data.forEach((j) => {
          list.push({
            id: j.id,
            name: j.name,
            email: j.email,
          })
        })
      }

      setAdmin(list)
      previousAdmin.current = list
      setIsloading(false)
    })
    .catch((err) => {
      console.log(err)
    })

    // return console.log('Clean-Up')
  }, [])
  return (
    <React.Fragment>
      <SideBar />
      <div className="main">
        <div className="container">
          <MyAlert
            showAlert={alertShow}
            closeAlert={closeAlert}
            msgAlert={msgAlert}
          />
          <div className="mb-3">
            <h5>ADMIN LIST</h5>
          </div>
          <div className="header-btn-div mb-3">
            <Link to="/admins/create">
              <button className="btn btn-primary btn-sm header-btn">NEW</button>
            </Link>
          </div>
          <input
            type="text"
            name="search"
            className="form-control form-control-sm mb-3"
            placeholder="Search..."
            onKeyPress={(e) => searchAdmin(e)}
          />
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="sm">NAME</th>
                  <th className="md">EMAIL</th>
                  <th className="text-center sm">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan={5}>loading...</td>
                  </tr>
                ) : (
                  admin.map((adm, index) => {
                    return (
                      <AdminList
                        key={adm.id}
                        adm={adm}
                        deleteAdmin={deleteAdmin}
                      />
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminIndex