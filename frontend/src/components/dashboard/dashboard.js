import React, { Component } from "react";
import { Dropdown,Navbar, Nav, Button } from "react-bootstrap";
import head from "./logo.png";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import {userLogout}from "../../actions/loginAction" 
import CenterPage from "../centerpage/CenterPage"
import { connect } from 'react-redux';
import "./dashboard.css";

class dashboard extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      redirectVar: null,
    };
    this.landingPage = this.landingPage.bind(this);
  }

  landingPage = () => {
    this.setState({ redirectVar: <Redirect to="/" /> });
    cookie.remove("cookie");
    this.props.userLogout();
  };

  render() {
    console.log(cookie.load("cookie"));
    if (!cookie.load("cookie")) {
      this.setState({ redirectVar: <Redirect to="/" /> });
    }

    return (
      <div>
        {this.state.redirectVar}
        <Navbar bg="light" variant="light">
          <Nav className="container-fluid">
            <img
              alt=""
              src={head}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
            <div class="split">Splitwise</div>
            <Dropdown className="dropdown">
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                Manage Groups
            </Dropdown.Toggle>
          
            <Dropdown.Menu>
              <Dropdown.Item href="/creategroup">Create Group</Dropdown.Item>
              <Dropdown.Item href="/mygroups">My Groups</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

            <Nav.Item className="ml-auto">
 
              <Button variant="info" onClick={this.landingPage}>
                Logout
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
        <div className="dashboard">
        <CenterPage page={"Dashboard"} email={cookie.load("cookie")}/> 
        </div>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({response});


export default connect(mapStateToProps, {userLogout})(dashboard);
