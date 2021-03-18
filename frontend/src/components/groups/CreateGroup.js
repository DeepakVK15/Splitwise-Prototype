import React, { Component } from "react";
import head from "../login/logo.png";
import { Button } from "react-bootstrap";
import "./creategroups.css";
import axios from "axios";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import Head from "../Heading/Heading";
import {uri} from '../../uri';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [{ name: "", email: "" }],
      groupname: "",
      image: null,
      errCode: "",
      redirectVar: null,
      users: [],
      suggestions: [],
    };
    this.groupnameHandler = this.groupnameHandler.bind(this);
    this.friendsHandler = this.friendsHandler.bind(this);
    this.imageHandler = this.imageHandler.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.landingPage = this.landingPage.bind(this);
  }

  groupnameHandler = (e) => {
    this.setState({
      groupname: e.target.value,
    });
  };

  friendsHandler = (e) => {
    this.setState({
      friends: e.target.value,
    });
  };

  imageHandler = (e) => {
    this.setState({
      image: e.target.value,
    });
  };

  addClick() {
    this.setState((prevState) => ({
      friends: [...prevState.friends, { name: "", email: "" }],
    }));
  }

  landingPage = () => {
    this.setState({ redirectVar: <Redirect to="/" /> });
    cookie.remove("cookie");
  };

  dashBoard = () => {
    this.setState({ redirectVar: <Redirect to="/dashboard" /> });
  };

  createUI() {
    return this.state.friends.map((el, i) => (
      <div>
        <div key={i}>
          <input
            placeholder="Name"
            name="name"
            value={el.name || ""}
            onChange={this.handleChange.bind(this, i)}
          />
          &nbsp; &nbsp;
          <input
            placeholder="Email"
            name="email"
            value={el.email || ""}
            onChange={this.handleChange.bind(this, i)}
          />
        </div>
        <br />
      </div>
    ));
  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, "i");
      suggestions = this.state.users.sort().filter((v) => regex.test(v.name));
    }
    let friends = [...this.state.friends];
    friends[i] = { ...friends[i], [name]: value };
    this.setState({ friends });
    this.setState(() => ({ suggestions }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div>
        {suggestions.map((user) => (
          <ul onClick={this.clearSuggestions()}>
            {user.name} - {user.email}
          </ul>
        ))}
      </div>
    );
  }

  clearSuggestions() {
    this.state.suggestions = [];
  }

  componentDidMount() {
    axios.get(`${uri}/group/users`).then((response) => {
      this.setState({
        users: this.state.users.concat(response.data),
      });
    });
  }

  createGroup() {
    if (this.state.groupname === "") {
      this.setState({ errCode: "Group should have a name." });
    } else if (this.state.friends.length < 2) {
      this.setState({ errCode: "Group should have two or more members." });
    } else {
      const data = {
        groupname: this.state.groupname,
        friends: this.state.friends,
        image: this.state.image,
        email: cookie.load("cookie"),
      };

      axios.defaults.withCredentials = true;
      axios
        .post(`${uri}/group/creategroup`, data)
        .then((response) => {
          // eslint-disable-next-line react/no-direct-mutation-state
          // this.setState({errCode :response.status})
          if (response.data.message) {
            this.setState({ errCode: response.data.message });
          }
        });
    }
  }

  render() {
    let errMsg = null;
    if (
      this.state.errCode === "Group with the same name already exists." ||
      this.state.errCode === "Group should have two or more members." ||
      this.state.errCode === "Group should have a name."
    ) {
      errMsg = (
        <div class="alert alert-danger" role="alert">
          {this.state.errCode}
        </div>
      );
    }
    if (this.state.errCode === "inserted users") {
      this.setState({ redirectVar: <Redirect to="/dashboard" /> });
    }
    return (
      <div>
        {errMsg}
        {this.state.redirectVar}
        <Head />
        <img
          className="loginImage"
          alt="createGrp"
          src={head}
          width="150"
          height="150"
        />
        <br />
        <form class="creategroupform">
          <div class="intro">
            <h6>START A NEW GROUP</h6>
            <br />
            <label>Group Image</label> &nbsp; &nbsp;
            <input
              type="file"
              className="image"
              accept=".jpg,.jpeg,.png,.svg"
              onChange={this.imageHandler}
            />
            <br />
            <br />
            <label class="font-weight-normal">My group shall be called: </label>
            <br />
            <input
              type="text"
              id="groupname"
              onChange={this.groupnameHandler}
              placeholder="Group name"
              data-testid="groupname"
              value={this.state.groupname}
            />
            <br />
            <br />
            <label class="font-weight-normal">GROUP MEMBERS</label>
            <br />
            {this.createUI()}
            {this.renderSuggestions()}
            <Button variant="link" onClick={this.addClick.bind(this)}>
              +Add a person
            </Button>
            <br />
            <button
              type="button"
              class="createGroup"
              onClick={this.createGroup}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateGroup;
