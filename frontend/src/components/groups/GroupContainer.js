import React, { Component } from "react";
import GroupSearch from "./GroupSearch";

class GroupContainer extends Component {
  render() {
    return (
      <div>
        {this.props.groups.map((group) => (
          <GroupSearch group={group} />
        ))}
      </div>
    );
  }
}

export default GroupContainer;
