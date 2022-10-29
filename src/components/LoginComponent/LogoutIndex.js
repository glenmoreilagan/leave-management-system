import React, { useEffect } from "react"
// import axios from "axios"
import axiosConfig from "../../axiosConfig"
import "../../css/LoginStyle.css"

import { useHistory as History } from "react-router-dom"

const LogoutIndex = () => {
  const history = History()

  useEffect(() => {
    axiosConfig
      .post(`/api/logout`, { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          localStorage.removeItem("UserToken")
          sessionStorage.removeItem('user')

          history.push("/")
          window.location.href = 'http://localhost:3000/'
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })

  return <div className="main-div-logout">Logout</div>
}

export default LogoutIndex
