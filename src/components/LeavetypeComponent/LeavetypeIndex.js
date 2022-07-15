import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../css/TableStyle.css'
import axios from 'axios'
import axiosConfig from "../../axiosConfig"


import LeavetypeList from './LeavetypeList'

const LeavetypeIndex = () => {
  const [leavetype, setLeavetype] = useState([])
  const [isLoading, setIsloading] = useState(true)

  const deleteLeavetype = (id) => {
    axiosConfig.delete(`/leavetypes/${id}`)
    .then((res) => {
      console.log(res)
      if(res.status == 200) {
        let list = []
        leavetype.map((val, index) => {
          if(id != val.id) {
            list.push({
              id : val.id,
              leavetype : val.leavetype,
              leavedescription : val.leavedescription,
            })
          }
        })
        setLeavetype(list)
      }
    })
    .catch((res) => {
      console.log(res)
    })
  }

  useEffect(() => {
    axiosConfig.get(`/leavetypes`)
    .then(res => {
      console.log(res)
      let list = []
      if(res.status == 200) {
        res.data.map(j => {
          list.push({
            id : j.id,
            leavetype : j.leavetype,
            leavedescription : j.leavedescription,
          })
        })
      }
  
      setLeavetype(list)
      setIsloading(false)
    })
    .catch(err => {
      console.log(err)
    })
  
    // return console.log('Clean-Up')
  }, [])

  return (
    <React.Fragment>
      <div className='mb-3'>
        <h5>LEAVE TYPE LIST</h5>
      </div>
      <div className='header-btn-div mb-3'>
        <Link to='/leavetypes/create'><button className='btn btn-primary btn-sm header-btn'>NEW</button></Link>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th className='sm'>LEAVE TYPE</th>
              <th className='md'>LEAVE DESCRIPTION</th>
              <th className='text-center sm'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading ? <tr style={{textAlign:'center'}}><td colSpan={5}>loading...</td></tr>
              : leavetype.map((ltype, index) => { 
                return (
                  <LeavetypeList 
                    key = {ltype.id} 
                    ltype = {ltype}
                    deleteLeavetype = {deleteLeavetype}
                  />
                ) 
              })
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default LeavetypeIndex