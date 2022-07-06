import SideBarItems from "./SideBarItems"
import items from "./SideNavData.json"


export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="system-logo-title">
        <h4>EMPLOYEE LEAVE MANAGEMENT SYSTEM</h4>
      </div>
      {items.map((item, index) => <SideBarItems key={index} item={item} />)}
    </div>
  )
}