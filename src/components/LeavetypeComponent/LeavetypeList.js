import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LeavetypeList = props => {
  const { ltype, deleteLeavetype } = props

  return (
    <React.Fragment>
      <tr>
        <td>{ltype.leavetype}</td>
        <td>{ltype.leavedescription}</td>
        <td className='text-center'>
          <Link to={`/leavetypes/${ltype.id}`}>
            <i className="bi bi-pencil-square btn-action-icon" title='Edit'></i>
          </Link>
          &nbsp;
          <i className="bi bi-x-square btn-action-icon" title='Delete' onClick={() => deleteLeavetype(ltype.id)}></i>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default LeavetypeList