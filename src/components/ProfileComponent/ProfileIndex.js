import React from "react";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import SideBar from "../SideNav/SideBar";

function ProfileIndex() {
  return (
    <React.Fragment>
      <SideBar />
      <div className="main">
        <div className="container">
          <Card>
            <Card.Header>
              <i class="bi bi-caret-right-fill"></i> PROFILE
            </Card.Header>
            <Card.Body>
              <Tab.Container
                id="list-group-tabs-example"
                defaultActiveKey="#link1"
              >
                <Row>
                  <Col sm={4}>
                    <ListGroup>
                      <ListGroup.Item action href="#link1">About Me</ListGroup.Item>
                      <ListGroup.Item action href="#link2">My Account</ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col sm={8}>
                    <Tab.Content>
                      <Tab.Pane eventKey="#aboutme">
                        {/* info here */}
                      </Tab.Pane>
                      <Tab.Pane eventKey="#myaccount">
                        {/* info here */}
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProfileIndex;
