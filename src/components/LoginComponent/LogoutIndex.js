import React, { useEffect, useState } from "react"
import axios from "axios"
import axiosConfig from "../../axiosConfig"
import "../../css/LoginStyle.css"

import { useHistory as History } from "react-router-dom"

const LogoutIndex = () => {
  const history = History()

  useEffect(() => {
    axiosConfig.post(`/api/logout`, {withCredentials : true})
    .then((res) => {
      if (res.data.status) {
        localStorage.removeItem("UserToken");
        history.push("/")
      }
    })
    .catch((err) => {
      console.log(err)
    })
  })

  return (
    <div className="main-div-logout"></div>
  )
}

export default LogoutIndex
