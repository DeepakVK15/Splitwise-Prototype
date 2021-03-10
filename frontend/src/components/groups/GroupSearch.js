import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
import "./mygroups.css";

class GroupSearch extends Component {
  state = {
    redirect: null,
  };

  loadGroupPage(e) {
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
  render() {
    return (
      <div className="groupButtons">
        {this.state.redirect}
        <Button
          variant="light"
          className="groupButtons"
          onClick={() => this.loadGroupPage(this.props.group)}
        >
          {this.props.group}
        </Button>
        <br />
        <br />
      </div>
    );
  }
}

export default GroupSearch;
