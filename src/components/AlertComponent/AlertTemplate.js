import React from 'react'
// import Button from 'react-bootstrap/Button'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';

const AlertTemplate = (props) => {
  const {showAlert, closeAlert, msgAlert} = props

  return (
    <div className="position-relative">
      <ToastContainer position={'top-end'}>
        <Toast onClose={() => closeAlert(false)} show={showAlert} delay={3000} autohide>
          <Toast.Header> {/* style={{background:'#365899'}} className='text-white' */}
            {/* <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            /> */}
            <strong className="me-auto">Notification</strong>
            <small>1 second ago</small>
          </Toast.Header>
          <Toast.Body>{msgAlert}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default AlertTemplate