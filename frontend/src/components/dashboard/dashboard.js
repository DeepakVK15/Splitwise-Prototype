import React, { Component } from 'react';
import { Navbar, Nav, Button } from "react-bootstrap";
import head from "./logo.png";
import { Redirect } from "react-router";
import cookie from "react-cookies";

class dashboard extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
          redirectVar: null
        };
        this.landingPage = this.landingPage.bind(this);
    }

    landingPage = () => {
        this.setState({redirectVar: <Redirect to="/" /> });
      };
    
   
    render() { 
        console.log(cookie.load("cookie"));
        if (cookie.load("cookie")) {
            this.setState({redirectVar: <Redirect to="/" />});
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
            <Nav.Item className="ml-auto">
              <Button variant="info" onClick={this.landingPage}>
               Logout
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
            </div>
        )

    }
}
 
export default dashboard;
