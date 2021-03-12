import React, { Component } from "react";
import head from "./logo.png";
import "./signup.css";
import { Redirect } from "react-router";
import validator from "validator";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import { userSignup } from "../../actions/signupAction";

class signup extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      name: "",
      email: "",
      password: "",
      message: "",
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
      this.setState({ message: "Enter a valid email address." });
      console.log("validate email", data.email);
    } else if (data.name === "") {
      this.setState({ message: "Enter a name." });
    } else if (data.password.length < 8) {
      this.setState({ message: "Password length must be 8 or more." });
    } else {
      this.props.userSignup(data);
    }
  };
  render() {
    let redirectVar = null;
    let errMsg = null;
    console.log("Message after signup", this.props.user.message);

    if (this.props.user && this.props.user.message === "sign up success") {
      const cookies = new Cookies();
      cookies.set("cookie", this.state.email, { path: "/" });
      redirectVar = <Redirect to="/dashboard" />;
    } else if (
      this.state.message === "Enter a valid email address." ||
      this.state.message === "Enter a name." ||
      this.state.message === "Password length must be 8 or more."
    ) {
      errMsg = (
        <div class="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      );
    } else if (
      this.props.user.message === "Account with email id already exists."
    ) {
      errMsg = (
        <div class="alert alert-danger" role="alert">
          {this.props.user.message}
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
              Already have an account? Sign In
            </a>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.signup.user,
  };
};
export default connect(mapStateToProps, { userSignup })(signup);
// export default signup;
