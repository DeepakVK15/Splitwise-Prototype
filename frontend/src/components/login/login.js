import { React, Component } from "react";
import head from "./logo.png";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./login.css";
import axios from "axios";
import { Redirect } from "react-router";
import cookie from "react-cookies";

class login extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      errCode: "",
      redirectVar: null,
    };

    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.login = this.login.bind(this);
    this.signupPage = this.signupPage.bind(this);
  }

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  signupPage = () => {
    this.setState({ redirectVar: <Redirect to="/signup" /> });
  };

  login = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios.post("http://localhost:3001/login", data).then((response) => {
      // eslint-disable-next-line react/no-direct-mutation-state
      // this.setState({errCode :response.status})
      if (response.data.message) {
        this.setState({ errCode: response.data.message });
      }
    });
  };

  render() {
    let errMsg = null;
    console.log("In Login cookie", cookie.load("cookie"));
    if (cookie.load("cookie")) {
      console.log("checking redirect");
      this.setState({ redirectVar: <Redirect to="/dashboard" /> });
    }

    if (this.state.errCode === "login success") {
      this.setState({ redirectVar: <Redirect to="/dashboard" /> });
    } else if (this.state.errCode === "Incorrect username or password.") {
      errMsg = (
        <div class="alert alert-danger" role="alert">
          {this.state.errCode}
        </div>
      );
    }

    return (
      <div>
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
              <Button variant="success" onClick={this.signupPage}>
                Sign up
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
        {this.state.redirectVar}
        {errMsg}
        <img
          className="loginImage"
          alt=""
          src={head}
          width="150"
          height="150"
        />
        <form class="loginform">
          <div class="intro">
            <h6>WELCOME TO SPLITWISE</h6>
            <br />
            <label class="font-weight-bold">Email address: </label>
            <br />
            <input type="email" id="email" onChange={this.emailChangeHandler} />
            <br />
            <br />

            <label class="font-weight-bold">Password: </label>
            <br />
            <input
              type="password"
              id="password"
              onChange={this.passwordChangeHandler}
            />
            <br />
            <br />
            <button type="button" class="login" onClick={this.login}>
              Login
            </button>
            <br />
            <br />
          </div>
        </form>
      </div>
    );
  }
}
export default login;
