import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "../../css/TableStyle.css"
// import axios from "axios"
import axiosConfig from "../../axiosConfig"
import redirectLogin from "../../redirectLogin"

import EmployeeList from "./EmployeeList"
import MyAlert from "../AlertComponent/AlertTemplate"
import SideBar from "../SideNav/SideBar"

const EmployeeIndex = () => {
  const [employee, setEmployee] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const previousEmployee = useRef(null)
  const [alertShow, setAlertShow] = useState(false)
  const [msgAlert, setMsgAlert] = useState("")

  const deleteEmployee = (id) => {
    axiosConfig
      .delete(`/api/employees/${id}`)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          // let list = []
          // employee.forEach((val, index) => {
          //   if (id !== val.id) {
          //     list.push({
          //       id: val.id,
          //       empcode: val.empcode,
          //       empname: val.empname,
          //       address: val.address,
          //       phone: val.phone,
          //     })
          //   }
          // })
          // setEmployee(list)

          setEmployee(employee => employee.filter((emp) => emp.id !== id))
          setAlertShow(true)
          setMsgAlert(res.data.message)
        }
      })
      .catch((res) => {
        console.log(res)
      })
  }

  const searchEmployee = (e) => {
    let search_str = e.target.value.toLowerCase()

    let filteredLeave = previousEmployee.current.filter((data) => {
      return (
        data.empcode.toLowerCase().includes(search_str) ||
        data.empname.toLowerCase().includes(search_str)
      )
    })

    // if (e.key === "Enter") {
    setEmployee(filteredLeave)
    // }
  }

  const closeAlert = (status) => {
    setAlertShow(status)
  }

  useEffect(() => {
    redirectLogin();
    axiosConfig
      .get(`/api/employees`)
      .then((res) => {
        console.log(res)
        let list = []
        if (res.status === 200) {
          res.data.forEach((j) => {
            list.push({
              id: j.id,
              empcode: j.empcode,
              empname: j.empname,
              address: j.address,
              phone: j.phone,
              email: j.email,
              image: res.data[0].image,
            })
          })
        }

        setEmployee(list)
        previousEmployee.current = list
        setIsloading(false)
      })
      .catch((err) => {
        console.log(err)
      })

      // console.log(JSON.parse(sessionStorage.getItem('user')))
      

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
            <h5>EMPLOYEE LIST</h5>
          </div>
          <div className="header-btn-div mb-3">
            <Link to="/employees/create">
              <button className="btn btn-primary btn-sm header-btn">NEW</button>
            </Link>
          </div>
          <input
            type="text"
            name="search"
            className="form-control form-control-sm mb-3"
            placeholder="Search..."
            onKeyPress={(e) => searchEmployee(e)}
          />
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="sm">EMPLOYEE CODE</th>
                  <th className="md">EMPLOYEE NAME</th>
                  <th className="lg">ADDRESS</th>
                  <th className="sm">CONTACT #</th>
                  <th className="text-center sm">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan={5}>loading...</td>
                  </tr>
                ) : (
                  employee.map((emp, index) => {
                    return (
                      <EmployeeList
                        key={emp.id}
                        emp={emp}
                        deleteEmployee={deleteEmployee}
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

export default EmployeeIndex
