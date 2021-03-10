import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import head from "./logo.png";
import "./landing.css";
import { Redirect } from "react-router";
import main from "./homepage.png";

//create the Navbar Component
class landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectVar: null,
    };
    this.signupPage = this.signupPage.bind(this);
    this.loginPage = this.loginPage.bind(this);
  }

  signupPage() {
    this.setState({ redirectVar: <Redirect to="/signup" /> });
  }
  loginPage() {
    this.setState({ redirectVar: <Redirect to="/login" /> });
  }

  render() {
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
            <Nav.Item className="ml-auto">
              <Button variant="light" onClick={this.loginPage}>
                Log in
              </Button>
              <Button variant="success" onClick={this.signupPage}>
                Sign up
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
        <img
              alt=""
              src={main}
              width="1625"
              height="700"
            />
      </div>
    );
  }
}

export default landing;
