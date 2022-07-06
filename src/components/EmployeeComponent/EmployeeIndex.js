import React from 'react'
import { Link } from 'react-router-dom';
import '../../css/TableStyle.css'

function EmployeeIndex() {
  return (
    <React.Fragment>
      <div>
        <h5>EMPLOYEE LIST</h5>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th className='sm'>EMPLOYEE CODE</th>
              <th className='md'>EMPLOYEE NAME</th>
              <th className='lg'>ADDRESS</th>
              <th className='sm'>CONTACT #</th>
              <th className='sm'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
              <td>
                <Link to='/employee/2'><button className='btn btn-primary btn-sm btn-action'>EDIT</button></Link>
                &nbsp;
                <button className='btn btn-danger btn-sm btn-action'>DELTE</button>
              </td>
            </tr>
            <tr>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
            </tr>
            <tr>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
              <td>TEST</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default EmployeeIndex