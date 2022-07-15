import React, { useState, useEffect } from "react"
import axios from "axios"
import axiosConfig from "../../axiosConfig"

const LookupLeaveType = (props) => {
  const [leavetype, setLeavetype] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const { leave, setLeave } = props
  const [closeModal, setClosemodal] = useState(false)

  const selectLeavetype = (id, ltype) => {
    setLeave({
      ...leave,
      leavetypeid : id,
      leavetype : ltype,
    })
    setClosemodal(true)
  }

  useEffect(() => {
    axiosConfig.get(`/leavetypes`)
    .then((res) => {
      console.log(res)
      let list = []
      if (res.status == 200) {
        res.data.map((j) => {
          list.push({
            id: j.id,
            leavetype: j.leavetype,
            leavedescription: j.leavedescription,
          })
        })
      }

      setLeavetype(list)
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
        id="LookupLeaveType"
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
                LEAVE TYPE
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
                      <th className="sm">LEAVE TYPE</th>
                      <th className="md">LEAVE DESCRIPTION</th>
                      <th className="text-center sm">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan={5}>loading...</td>
                      </tr>
                    ) : (
                      leavetype.map((ltype, index) => {
                        return (
                          <tr key={ltype.id}>
                            <td>{ltype.leavetype}</td>
                            <td>{ltype.leavedescription}</td>
                            <td className="text-center">
                              <i 
                                className="bi bi-check-square btn-action-icon"
                                title="Select" 
                                onClick={() => selectLeavetype(ltype.id, ltype.leavetype)}
                                data-bs-dismiss={closeModal == true ? 'modal' : ''}
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

export default LookupLeaveType
