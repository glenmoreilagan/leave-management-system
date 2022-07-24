import React, { useState, useEffect } from "react"
// import axios from "axios"
import axiosConfig from "../../axiosConfig"

const LookupDepartment = (props) => {
  const [department, setDepartment] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const { employee, setEmployee } = props
  const [closeModal, setClosemodal] = useState(false)

  const selectdepartment = (id, deptname) => {
    setEmployee({
      ...employee,
      dept_id : id,
      deptname : deptname,
    })
    setClosemodal(true)
  }

  useEffect(() => {
    axiosConfig.get(`/api/departments`)
    .then((res) => {
      console.log(res)
      let list = []
      if (res.status === 200) {
        res.data.forEach((j) => {
          list.push({
            id: j.id,
            deptprefix: j.deptprefix,
            deptcode: j.deptcode,
            deptname: j.deptname,
          })
        })
      }

      setDepartment(list)
      setIsloading(false)
    })
    .catch((err) => {
      console.log(err)
    })

    // return console.log('Clean-Up')
  }, [])

  return (
    <React.Fragment>
      <div
        className="modal fade"
        id="LookupDepartment"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                DEPARTMENTS
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="table-responsive" style={{height:'65vh'}}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="sm">DEPARTMENT CODE</th>
                      <th className="md">DEPARTMENT NAME</th>
                      <th className="text-center sm">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan={5}>loading...</td>
                      </tr>
                    ) : (
                      department.map((dept, index) => {
                        return (
                          <tr key={dept.id}>
                            <td>
                              <span className='font-bold'>{dept.deptprefix}</span> 
                              <br />
                              {dept.deptcode}
                            </td>
                            <td>{dept.deptname}</td>
                            <td className="text-center">
                              <i 
                                className="bi bi-check-square-fill btn-action-icon primary"
                                title="Select" 
                                onClick={() => selectdepartment(dept.id, dept.deptname)}
                                data-bs-dismiss={closeModal === true ? 'modal' : ''}
                              >
                              </i>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LookupDepartment
