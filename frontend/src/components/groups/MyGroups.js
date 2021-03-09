import React, { Component } from "react";
import axios from "axios";
import "./mygroups.css";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import Head from "../Heading/Heading";

class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      email: cookie.load("cookie"),
      redirect: null,
      invites: [],
    };
    this.loadGroupPage = this.loadGroupPage.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/mygroups/", {
        params: { email: this.state.email },
      })
      .then((response) => {
        //update the state with the response data
        this.setState({
          groups: this.state.groups.concat(response.data),
        });
      });
    axios
      .get("http://localhost:3001/invites", {
        params: { invite_to: this.state.email },
      })
      .then((response) => {
        this.setState({
          invites: this.state.invites.concat(response.data),
        });
      });
  }

  createGroupPage() {
    window.location.href = "/creategroup";
  }

  loadGroupPage(e) {
    // window.location.href ="/group/"+e;
    // this.setState({redirect:<Redirect to='/group' />})
    console.log("correctly passed ", e);
    this.setState({
      redirect: (
        <Redirect
          to={{
            pathname: "/group",
            state: { groupname: e },
          }}
        />
      ),
    });
  }
  landingPage = () => {
    this.setState({ redirect: <Redirect to="/" /> });
    cookie.remove("cookie");
  };

  dashBoard = () => {
    this.setState({ redirect: <Redirect to="/dashboard" /> });
  };

  accept = (username, groupname) => {
    const data = {
      invite_to: username,
      group: groupname,
    };
    axios.post("http://localhost:3001/acceptInvite", data);
    window.location.reload(true);
  };

  reject = (username, groupname) => {
    const data = {
      invite_to: username,
      group: groupname,
    };
    axios.post("http://localhost:3001/rejectInvite", data);
    window.location.reload(true);
  };

  render() {
    const groups = this.state.groups.map((group) => (
      <ul>
        <Button
          variant="light"
          onClick={() => this.loadGroupPage(group)}
          className="groupButtons"
        >
          {group}
        </Button>
      </ul>
    ));

    const invites = this.state.invites.map((invite) => (
      <div>
        <label>
          {invite.name} has invited you to join "{invite.groupname}"
        </label>
        &nbsp;
        <Button
          variant="outline-success"
          className="inviteButton"
          onClick={() => this.accept(invite.invite_to, invite.groupname)}
        >
          +
        </Button>
        &nbsp;
        <Button
          variant="outline-danger"
          className="inviteButton"
          onClick={() => this.reject(invite.invite_to, invite.groupname)}
        >
          x
        </Button>
      </div>
    ));
    console.log("redirecting", this.state.redirectVar);

    return (
      <div>
        {this.state.redirect}
        <Head />
        <div class="mygroups">
          <div>
            <br />
            <label>My Groups </label> &nbsp; &nbsp;
            <Button
              variant="link"
              class="addButton"
              onClick={this.createGroupPage}
            >
              +add group
            </Button>
            <br />
            <br />
            {groups}
          </div>
          <div className="invites">
            <label>Invites </label> &nbsp; &nbsp;
            {invites}
          </div>
        </div>
      </div>
    );
  }
}

export default MyGroups;
