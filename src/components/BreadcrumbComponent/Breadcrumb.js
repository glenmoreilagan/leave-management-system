import React from 'react'
import { Link, useParams } from "react-router-dom"
import Breadcrumb_BS from 'react-bootstrap/Breadcrumb'

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
      <Breadcrumb_BS className="breadcrumb">
        <Breadcrumb_BS.Item linkAs={Link} linkProps={{ to: `/${linkTo}` }}>{label}</Breadcrumb_BS.Item>
        <Breadcrumb_BS.Item active>
          {id != "create" ? "Edit" : "Create"} {label}
        </Breadcrumb_BS.Item>
      </Breadcrumb_BS>
    </React.Fragment>
  )
}

export default Breadcrumb