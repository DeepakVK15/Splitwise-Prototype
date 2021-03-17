import React, { Component } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import head from "./logo.png";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Heading extends Component {
  state = {
    redirectVar: null,
  };

  landingPage = () => {
    this.setState({ redirectVar: <Redirect to="/" /> });
    cookie.remove("cookie");
  };

  dashBoard = () => {
    this.setState({ redirectVar: <Redirect to="/dashboard" /> });
  };

  render() {
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
            <div className="split">Splitwise</div>
            <Nav.Item className="ml-auto">
              <Button variant="light" onClick={this.dashBoard}>
                Dashboard
              </Button>
              <Button variant="success" onClick={this.landingPage}>
                Logout
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Heading;
