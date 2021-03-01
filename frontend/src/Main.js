import { React, Component } from "react";
import { Route } from "react-router";
import landing from "./components/landing/landing";
import signup from "./components/signup/signup";
import login from "./components/login/login";
import dashboard from "./components/dashboard/dashboard";
import CreateGroup from "./components/groups/CreateGroup";
import MyGroups from "./components/groups/MyGroups";



class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={landing} />
        <Route exact path="/signup" component={signup} />
        <Route exact path="/login" component={login} />
        <Route exact path="/dashboard" component={dashboard} />
        <Route exact path="/creategroup" component={CreateGroup} />
        <Route exact path="/mygroups" component={MyGroups} />
      </div>
    );
  }
}

export default Main;
