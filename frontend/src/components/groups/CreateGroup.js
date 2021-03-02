import React, { Component } from "react";
import head from "../login/logo.png";
import { Button } from "react-bootstrap";
import "./creategroups.css";
import axios from "axios";
import { Redirect } from "react-router";
import cookie from "react-cookies";

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [{ name: "", email: "" }],
      groupname: "",
      image: null,
      errCode: "",
      redirectVar: "",
    };
    this.groupnameHandler = this.groupnameHandler.bind(this);
    this.friendsHandler = this.friendsHandler.bind(this);
    this.imageHandler = this.imageHandler.bind(this);
    this.createGroup = this.createGroup.bind(this);
   
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
    let friends = [...this.state.friends];
    friends[i] = { ...friends[i], [name]: value };
    this.setState({ friends });
  }

  createGroup() {
    const data = {
      groupname: this.state.groupname,
      friends: this.state.friends,
      image: this.state.image,
    };
    const obj = {
      email: cookie.load("cookie"),
    }
    this.state.friends.push(obj)
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:3001/creategroup", data).then((response) => {
      // eslint-disable-next-line react/no-direct-mutation-state
      // this.setState({errCode :response.status})
      if (response.data.message) {
        this.setState({ errCode: response.data.message });
      }
    });
  }

  render() {
    let errMsg = null;
    if (this.state.errCode === "Group with the same name already exists.") {
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
        <img
          className="loginImage"
          alt=""
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
            />
            <br />
            <br />
            <label class="font-weight-normal">GROUP MEMBERS</label>
            <br />
            {this.createUI()}
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
