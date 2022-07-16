import React, { useState } from 'react'
import axios from 'axios'
import axiosConfig from "../../axiosConfig"

import { useHistory as History } from 'react-router-dom';

const LoginIndex = () => {
  const history = History()
  const [userLogin, setUserlogin] = useState({})

  const onChangeInput = (e) => {
    const { name, value } = e.target

    setUserlogin({
      ...userLogin,
      [name] : value
    })
  }

  const btnLogin = () => {
    axiosConfig.post(`/login`, userLogin)
    .then(res => {
      if(res.data.status) {
        history.push('/employees')
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  const btnPost = () => {
    console.log()
    axiosConfig.post(`/posts`, userLogin)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div style={{display:'flex', justifyContent:'center', border:'1px solid', height:'50vh'}}>
      <div style={{border:'1px solid', width:'50vw', height:'100%', padding:'1em'}}>
        <div className='div-username mb-3'>
          <label>Username</label>
          <input type='text' name='username' className='form-control form-control-sm' onChange={(e) => onChangeInput(e)} />
        </div>
        <div className='div-password mb-3'>
          <label>Password</label>
          <input type='password' name='password' className='form-control form-control-sm' onChange={(e) => onChangeInput(e)} />
        </div>

        <div className='div-login-btn'>
          <button style={{width: '100px'}} className='btn btn-primary btn-sm' onClick={btnLogin}>LOGIN</button>
          <button style={{width: '200px'}} className='btn btn-link btn-sm' onClick={btnPost}>Don't have account?</button>
        </div>
      </div>
    </div>
  )
}

export default LoginIndex