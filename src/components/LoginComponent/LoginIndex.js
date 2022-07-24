import React, { useEffect, useState } from "react"
import axios from "axios"
import axiosConfig from "../../axiosConfig"
import "../../css/LoginStyle.css"

import { useHistory as History } from "react-router-dom"

const LoginIndex = () => {
  const history = History()
  const [userLogin, setUserlogin] = useState({})
  const [errorCreds, setErrorCreds] = useState({
    email : '',
    password : ''
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target

    setUserlogin({
      ...userLogin,
      [name]: value,
    })
  }

  const btnLogin = () => {
    axios.post(`http://localhost:8000/api/login`, userLogin, {withCredentials : true})
    .then((res) => {
      if (res.data.status) {
        localStorage.setItem('UserToken', JSON.stringify(res.data.token))
        axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('UserToken'))}`

        sessionStorage.setItem("user", JSON.stringify({
          e_id : res.data.user.emp_id, 
          name : res.data.user.name, 
          role : res.data.role,
        }))

        if(res.data.role === 'c81e728d9d4c2f636f067f89cc14862c') {
          history.push("/applyleaves")
        } else if(res.data.role === 'c4ca4238a0b923820dcc509a6f75849b') {
          history.push("/employees")
        }

      }
    })
    .catch((err) => {
      console.log(err)
      setErrorCreds({
        ...errorCreds,
        email : err.response.data.errors.email[0],
        password : err.response.data.errors.password[0],
      })
    })
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/sanctum/csrf-cookie`, {withCredentials : true})
    .then((res) => {
      if (res.data.status) {
        // history.push("/employees")
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])
  console.log(errorCreds)
  return (
    <div className="main-div-login">
      <div className="login-div">
        <h4 className="mb-3 text-center">Log in to your account</h4>
        <div className="div-email mb-3">
          <label>Email</label> <sup className="text-danger">{errorCreds.email}</sup>
          <input
            type="text"
            name="email"
            className="form-control form-control-sm"
            onChange={(e) => onChangeInput(e)}
            value={userLogin.email || ''}
          />
        </div>
        <div className="div-password mb-3">
          <label>Password</label> <sup className="text-danger">{errorCreds.password}</sup>
          <input
            type="password"
            name="password"
            className="form-control form-control-sm"
            onChange={(e) => onChangeInput(e)}
            value={userLogin.password || ''}
          />
        </div>

        <a href="#forgot-password">Forgot password?</a>
        <div className="div-login-btn">
          <button className="btn btn-sm btn-login" onClick={btnLogin}>
            LOGIN
          </button>
          {/* <button className="btn btn-link btn-sm btn-register">
            Don't have account?
          </button> */}
        </div>
      </div>

      <div className="custom-shape-divider-bottom-1658081064">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default LoginIndex
