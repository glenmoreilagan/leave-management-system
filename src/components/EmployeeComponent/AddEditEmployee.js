import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

function AddEditEmployee() {
  const { id } = useParams()
  const [employee, setEmployee] = useState([])

  const inputOnChange = (e) => {
    const { name, value } = e.target

    setEmployee({
      ...employee,
      [name]: value,
    })
  }

  const saveEmployee = () => {
    if (id === "create") {
      axios.post("http://localhost:3001/employee/create", employee)
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.log(res)
      })
    } else {
      axios.put(`http://localhost:3001/employee/${id}`, employee)
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

  useEffect(() => {
    if (id != "create") {
      axios.get(`http://localhost:3001/employee/${id}/edit`)
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          setEmployee({
            empname: res.data[0].empname,
            address: res.data[0].address,
            phone: res.data[0].phone,
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
      <nav className="breadcrumb" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/employee">Employee</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {id != "create" ? "Edit" : "Create"} Employee
          </li>
        </ol>
      </nav>
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
              <input
                onChange={(e) => inputOnChange(e)}
                type="text"
                className="form-control form-control-sm"
                id="address"
                name="address"
                value={employee.address || ""}
              />
            </div>
            <div className="col">
              <label htmlFor="phone">Contact No.</label>
              <input
                onChange={(e) => inputOnChange(e)}
                type="text"
                className="form-control form-control-sm"
                id="phone"
                name="phone"
                value={employee.phone || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AddEditEmployee
