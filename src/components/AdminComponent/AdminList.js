import React from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'

const AdminList = props => {
  const { adm, deleteAdmin } = props

  return (
    <React.Fragment>
      <tr>
        <td>{adm.name}</td>
        <td>{adm.email}</td>
        <td className='text-center'>
          <Link to={`/admins/${adm.id}`}>
            <i className="bi bi-pencil-square btn-action-icon primary" title='Edit'></i>
          </Link>
          &nbsp;
          <i className="bi bi-x-square-fill btn-action-icon danger" title='Delete' onClick={() => deleteAdmin(adm.id)}></i>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default AdminList