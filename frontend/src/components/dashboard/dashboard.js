import React, { Component } from "react";
import { Dropdown, Navbar, Nav } from "react-bootstrap";
import head from "./logo.png";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import { userLogout } from "../../actions/loginAction";
import CenterPage from "../centerpage/CenterPage";
import { connect } from "react-redux";
import "./dashboard.css";
import axios from "axios";

class dashboard extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      redirectVar: null,
      email: cookie.load("cookie"),
      user: "",
    };
    this.landingPage = this.landingPage.bind(this);
  }

  landingPage = () => {
    this.setState({ redirectVar: <Redirect to="/" /> });
    cookie.remove("cookie");
    this.props.userLogout();
  };

  componentDidMount() {
    console.log("here ",this.state.email);
    if(this.state.email){
    axios
      .get("http://localhost:3001/user/", {
        params: { email: this.state.email },
      })
      .then((response) => {
        //update the state with the response data
        this.setState({
          user: response.data,
        });
      });
    }
  }

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
            <div className="dropdown">
            <Dropdown >
              <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                Manage Groups
              </Dropdown.Toggle><Dropdown.Menu>
              <Dropdown.Item href="/creategroup">Create Group</Dropdown.Item>
              <Dropdown.Item href="/mygroups">My Groups</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          &nbsp;
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Hi, {this.state.user}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={this.landingPage}>Logout</Dropdown.Item>
                <Dropdown.Item href="/activity">Activity</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </div>

          </Nav>
        </Navbar>
        <div className="dashboard">
          <CenterPage page={"Dashboard"} email={cookie.load("cookie")} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({ response });

export default connect(mapStateToProps, { userLogout })(dashboard);
