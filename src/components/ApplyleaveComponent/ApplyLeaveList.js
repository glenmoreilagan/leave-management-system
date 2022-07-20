import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import dateFormat from 'dateformat'

const ApplyLeaveList = props => {
  const { leave, index, approveLeave, deleteLeave } = props
  return (
    <React.Fragment>
      <tr>
        <td>
          <span className='font-bold'>{leave.empcode}</span> 
          <br />
          {leave.empname}
        </td>
        <td>
          <span className='font-bold'>{leave.leavetype}</span> 
          <br />
          {leave.leavedescription}
        </td>
        <td>{leave.reason}</td>
        
        <td><span className='font-bold'>{dateFormat(leave.start_date, "mmm d, yyyy")}</span>  - <span className='font-bold'>{dateFormat(leave.end_date, "mmm d, yyyy")}</span> </td>
        <td>{
          leave.status == 1 ? 
          <span className='badge custom-badge-primary'>Approved</span> 
          // <span className='badge custom-badge-danger'>Cancel</span> 
          : 
          <span className='badge custom-badge-secondary'>Pending</span> 
        }</td>
        <td className='text-center'>
          <i className="bi bi-check-square-fill btn-action-icon primary" title='Approve' onClick={() => approveLeave(leave.id, index)}></i>
          &nbsp;
          <i className="bi bi-x-square-fill btn-action-icon danger" title='Cancel' onClick={() => deleteLeave(leave.id)}></i>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default ApplyLeaveList