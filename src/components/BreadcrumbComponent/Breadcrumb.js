import React from 'react'
import { Link, useParams } from "react-router-dom"
import BreadcrumbBS from 'react-bootstrap/Breadcrumb'

const Breadcrumb = props => {
  const { id } = useParams()
  const { linkTo, label } = props

  return (
    <React.Fragment>
      {/* <nav className="breadcrumb" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/${linkTo}`}>{label}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {id != "create" ? "Edit" : "Create"} {label}
          </li>
        </ol>
      </nav> */}
      <BreadcrumbBS className="breadcrumb">
        <BreadcrumbBS.Item linkAs={Link} linkProps={{ to: `/${linkTo}` }}>{label}</BreadcrumbBS.Item>
        <BreadcrumbBS.Item active>
          {id !== "create" ? "Edit" : "Create"} {label}
        </BreadcrumbBS.Item>
      </BreadcrumbBS>
    </React.Fragment>
  )
}

export default Breadcrumb