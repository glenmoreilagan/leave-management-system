import { useState } from "react"
import { Link } from 'react-router-dom';

export default function SideBarItems({ item }) {
  const [open, setOpen] = useState(false);

  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title toggle-btn" onClick={() => setOpen(!open)}>
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i className="bi-chevron-down"></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => <SideBarItems key={index} item={child} />)}
        </div>
      </div>
    )
  } else {
    if (item.class) {
      return (
        <Link to={item.path || "#"} className={"sidebar-item "+item.class}>
          {item.icon && <i className={item.icon}></i>}
          {item.title}
        </Link>
      )
    } else {
      return (
        <Link to={item.path || "#"} className="sidebar-item plain">
          {item.icon && <i className={item.icon}></i>}
          {item.title}
        </Link>
      )
    }
  }
}