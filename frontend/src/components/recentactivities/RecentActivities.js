import axios from "axios";
import React, { Component } from "react";
import cookie from "react-cookies";
import "./activities.css";
import Head from "../Heading/Heading";

class RecentActivities extends Component {
  state = {
    activities: [],
    groups: [],
    group: "",
    order: "",
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/activities/myactivities", {
        params: { email: cookie.load("cookie") },
      })
      .then((response) => {
        //update the state with the response data
        this.setState({
          activities: this.state.activities.concat(response.data),
        });
      });

    axios
      .get("http://localhost:3001/mygroups/mygroups", {
        params: { email: cookie.load("cookie") },
      })
      .then((response) => {
        //update the state with the response data
        this.setState({
          groups: this.state.groups.concat(response.data),
        });
      });
    console.log("Group list", this.state.groups);
  }

  handleChange = (e) => {
    this.setState({
      group: e.target.value,
    });
  };

  orderChange = (e) => {
    this.setState({
      order: e.target.value,
    });
  };

  render() {
    let activities = [];
    if (this.state.activities.length === 0) {
      activities.push(
        <div>
          <br />
          No recent activity to show.
        </div>
      );
    }

    if (this.state.order === "desc") {
      console.log("desc");
      this.state.activities.sort(function (a, b) {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
      });
    } else if (this.state.order === "asc") {
      console.log("DESC");
      this.state.activities.sort(function (a, b) {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });
    }

    for (let i = 0; i < this.state.activities.length; i++) {
      if (this.state.activities[i].user === cookie.load("cookie")) {
        this.state.activities[i].name = "You";
      }

      console.log("Value of group", this.state.group);
      if (this.state.group === "") {
        if (this.state.activities[i].operation === "added") {
          activities.push(
            <div className="activity">
              {this.state.activities[i].name} added the expense &nbsp;"
              {this.state.activities[i].description}" in "
              {this.state.activities[i].groupname}"
              <div className="date">
                {this.state.activities[i].date.split("T")[0]} &nbsp;
              </div>
              <br />
            </div>
          );
        } else if (this.state.activities[i].operation === "created") {
          activities.push(
            <div className="activity">
              {this.state.activities[i].name} created the group &nbsp; "
              {this.state.activities[i].groupname}"
              <div className="date">
                {this.state.activities[i].date.split("T")[0]} &nbsp;
              </div>
              <br />
            </div>
          );
        } else if (this.state.activities[i].operation === "updated") {
          activities.push(
            <div className="activity">
              {this.state.activities[i].name} updated the group &nbsp; "
              {this.state.activities[i].groupname}"
              <div className="date">
                {this.state.activities[i].date.split("T")[0]}
              </div>
              <br />
            </div>
          );
        }
      } else {
        console.log("Value of Group", this.state.group);
        if (
          this.state.activities[i].operation === "added" &&
          this.state.activities[i].groupname === this.state.group
        ) {
          console.log("inside if");
          activities.push(
            <div className="activity">
              {this.state.activities[i].name} added the expense &nbsp;"
              {this.state.activities[i].description}" in "
              {this.state.activities[i].groupname}"
              <div className="date">
                {this.state.activities[i].date.split("T")[0]} &nbsp;
              </div>
              <br />
            </div>
          );
        } else if (
          this.state.activities[i].operation === "created" &&
          this.state.activities[i].groupname === this.state.group
        ) {
          activities.push(
            <div className="activity">
              {this.state.activities[i].name} created the group &nbsp; "
              {this.state.activities[i].groupname}"
              <div className="date">
                {this.state.activities[i].date.split("T")[0]} &nbsp;
              </div>
              <br />
            </div>
          );
        } else if (
          this.state.activities[i].operation === "updated" &&
          this.state.activities[i].groupname === this.state.group
        ) {
          activities.push(
            <div className="activity">
              {this.state.activities[i].name} updated the group &nbsp; "
              {this.state.activities[i].groupname}"
              <div className="date">
                {this.state.activities[i].date.split("T")[0]}
              </div>
              <br />
            </div>
          );
        }
      }
    }

    return (
      <div>
        <Head />
        <div className="activities">
          <h4>Recent activity</h4>
          <br />
          <br />
          <select
            onChange={this.handleChange}
            value={this.state.group}
            id="group"
          >
            <option selected value="">
              Select a group...
            </option>
            {this.state.groups.map((group) => {
              return <option value={group}> {group} </option>;
            })}
          </select>
          &nbsp; &nbsp;
          <select
            onChange={this.orderChange}
            value={this.state.order}
            id="order"
          >
            <option value="initial" selected>
              Sort By Date
            </option>
            <option value="asc">Recent first</option>
            <option value="desc">Recent last</option>
          </select>
          <br />
          <br />
          {activities}
        </div>
      </div>
    );
  }
}

export default RecentActivities;
