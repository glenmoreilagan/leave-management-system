import { useEffect, useState } from "react"
import SideBarItems from "./SideBarItems"
import itemsAdmin from "./SideNavData.json"
import itemsEmployee from "./SideNavDataEmployee.json"


export default function SideBar() {
  const [role, setRole] = useState({
    role: ''
  });

  console.log(role)
  useEffect(() => {
    setRole({
      role: JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).role : 'cfcd208495d565ef66e7dff9f98764da'
    })
  }, [])

  return (
    <div className="sidebar">
      <div className="system-logo-title">
        <h4>LEAVE MANAGEMENT SYSTEM</h4>
      </div>
      {
        // cfcd208495d565ef66e7dff9f98764da == 0 // no role
        // c4ca4238a0b923820dcc509a6f75849b == 1 // admin
        // c81e728d9d4c2f636f067f89cc14862c == 2 // employee
        role.role === 'c4ca4238a0b923820dcc509a6f75849b' ? itemsAdmin.map((item, index) => <SideBarItems key={index} item={item} />) 
        : role.role === 'c81e728d9d4c2f636f067f89cc14862c' ? itemsEmployee.map((item, index) => <SideBarItems key={index} item={item} />) : ''
      }
    </div>
  )
}