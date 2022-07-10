import React from 'react'
import { Link, useParams } from "react-router-dom"

const Breadcrumb = props => {
  const { id } = useParams()
  const { linkTo, label } = props

  return (
    <React.Fragment>
      <nav className="breadcrumb" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/${linkTo}`}>{label}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {id != "create" ? "Edit" : "Create"} {label}
          </li>
        </ol>
      </nav>
    </React.Fragment>
  )
}

export default Breadcrumb