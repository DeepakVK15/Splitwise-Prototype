import React, { Component } from "react";
import head from "./logo.png";
import "./signup.css";
import axios from "axios";
import { Redirect } from "react-router";
import validator from "validator";

class signup extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      email: "",
      password: "",
      errCode: "",
    };

    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.create = this.create.bind(this);
  }

  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

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

  create = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    if (!validator.isEmail(data.email)) {
      this.setState({ errCode: "Enter a valid email address." });
    } else if (data.name === "") {
      this.setState({ errCode: "Enter a name." });
    } else if (data.password.length < 8) {
      this.setState({ errCode: "Password length must be 8 or more." });
    } else {
      axios.post("http://localhost:3001/signup", data).then((response) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        // this.setState({errCode :response.status})
        if (response.data.message) {
          this.setState({ errCode: response.data.message });
        }
      });
    }
  };
  render() {
    let redirectVar = null;
    let errMsg = null;

    if (this.state.errCode === "sign up success") {
      redirectVar = <Redirect to="/dashboard" />;
    } else if (
      this.state.errCode === "Enter a valid email address." ||
      this.state.errCode === "Account with email id already exists." ||
      this.state.errCode === "Enter a name." ||
      this.state.errCode === "Password length must be 8 or more."
    ) {
      errMsg = (
        <div class="alert alert-danger" role="alert">
          {this.state.errCode}
        </div>
      );
    }
    return (
      <div class="signinInfo">
        {redirectVar}
        {errMsg}
        <img
          className="signupImage"
          alt=""
          src={head}
          width="150"
          height="150"
        />
        <form class="signupform">
          <div class="intro">
            <h6>INTRODUCE YOURSELF</h6>
            <br />
            <label class="name">Hi there! My name is</label>
            <br />
            <input type="text" id="name" onChange={this.nameChangeHandler} />
            <br />
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
            <button type="button" class="signup" onClick={this.create}>
              Sign me up!
            </button>
            <br />
            <br />
            <a href="http://localhost:3000/login">
              Already have account? Sign In
            </a>
          </div>
        </form>
      </div>
    );
  }
}
export default signup;
