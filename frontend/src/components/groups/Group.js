import axios from "axios";
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import cookie from "react-cookies";
import "./mygroups.css";
import { Redirect } from "react-router";
import Head from "../Heading/Heading";
import { Dropdown } from "react-bootstrap";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.state.groupname,
      members: [],
      expenses: [],
      isOpen: false,
      description: "",
      paidmember: cookie.load("cookie"),
      amount: "",
      date: null,
      redirectVar: null,
      groupBalance: [],
      message: "",
      updateOpen: false,
      username: "",
      email: "",
      currency:""
    };
    this.descriptionHandler = this.descriptionHandler.bind(this);
    this.amountHandler = this.amountHandler.bind(this);
    this.landingPage = this.landingPage.bind(this);
  }

  descriptionHandler = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  nameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  emailHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  amountHandler = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  dateHandler = (e) => {
    this.setState({
      date: e.target.value,
    });
  };
  handleChange = (e) => {
    this.setState({
      paidmember: e.target.value,
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/group/group", {
        params: { name: this.state.name },
      })
      .then((response) => {
        // update the state with the response data
        this.setState({
          expenses: this.state.expenses.concat(response.data),
        });
      });
    axios
      .get("http://localhost:3001/group/members", {
        params: { name: this.state.name },
      })
      .then((response) => {
        this.setState({
          members: this.state.members.concat(response.data),
        });
      });
    axios
      .get("http://localhost:3001/group/groupbalances", {
        params: { groupname: this.state.name },
      })
      .then((response) => {
        this.setState({
          groupBalance: this.state.groupBalance.concat(response.data),
        });
      });
      axios.get("http://localhost:3001/profile/myprofile",{
        params: { email: cookie.load("cookie") }
    }).then((response) => {

      this.setState({currency:response.data[0].currency})
    });
  }

  openModal = () => this.setState({ isOpen: true });
  updateOpen = () => this.setState({ updateOpen: true });
  closeModal = () => {
    console.log("Paid by in group", this.state.paidmember);
    const data = {
      description: this.state.description,
      paid_by: this.state.paidmember,
      groupname: this.state.name,
      amount: this.state.amount,
      date: this.state.date,
      email: cookie.load("cookie")
    };
    console.log("Amount is", data.amount);
    axios.post("http://localhost:3001/group/group", data);

    this.setState({ isOpen: false });
    window.location.reload(true);
  };
  addUser = () => {
    const data = {
      groupname: this.state.name,
      email: this.state.email,
      invitedby: cookie.load("cookie"),
    };
    console.log("Amount is", data.amount);
    axios.post("http://localhost:3001/group/addUserToGroup", data);

    this.setState({ isOpen: false });
    window.location.reload(true);
  };

  close = () => {
    this.setState({ isOpen: false });
  };
  updateClose = () => {
    this.setState({ updateOpen: false });
  };
  landingPage = () => {
    this.setState({ redirectVar: <Redirect to="/" /> });
    cookie.remove("cookie");
  };

  dashBoard = () => {
    this.setState({ redirectVar: <Redirect to="/dashboard" /> });
  };

  settleUp = () => {
    const data = {
      name: cookie.load("cookie"),
      groupname: this.state.name,
    };
    axios.post("http://localhost:3001/transactions/settleup", data);
    window.location.reload(true);
  };

  leaveGroup = () => {
    console.log("in leavegroup");
    const data = {
      name: cookie.load("cookie"),
      groupname: this.state.name,
    };
    axios
      .post("http://localhost:3001/group/leaveGroup", data)
      .then((response) => {
        this.setState({
          message: response.data,
        });
      });
    console.log("Exit: ", this.state.message);
  };

  updateGroup = () => {
    this.setState({
      redirectVar: (
        <Redirect
          to={{
            pathname: "/updategroup",
            state: { groupname: this.state.name },
          }}
        />
      ),
    });
  };

  render() {
    let errMsg = null;
    console.log("message ", this.state.message);
    if (!cookie.load("cookie")) {
      this.setState({ redirectVar: <Redirect to="/" /> });
    }
    if (this.state.message === "Exited from group") {
      this.setState({ redirectVar: <Redirect to="/mygroups" /> });
    }
    if (this.state.message === "Please wait to recieve the remaining amount.") {
      errMsg = (
        <div class="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      );
    } else if (
      this.state.message === "Please clear your dues to leave the group."
    ) {
      errMsg = (
        <div class="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      );
    }

    let expenses = this.state.expenses.map((expense) => (
      <h6>
        {expense.date.split("T")[0]} &nbsp; {expense.description} &nbsp;{" "}
        {expense.name} &nbsp;{this.state.currency}{expense.amount}
      </h6>
    ));

    if (expenses.length === 0) {
      expenses = <h4>No expenses to show.</h4>;
    }

    let balance = [];
    for (let i = 0; i < this.state.groupBalance.length; i++) {
      if (
        this.state.groupBalance[i].balance !== null &&
        this.state.groupBalance[i].balance != 0
      ) {
        if (this.state.groupBalance[i].balance > 0) {
          balance.push(
            <h6>
              {this.state.groupBalance[i].name} gets back {this.state.currency}
              {this.state.groupBalance[i].balance}
            </h6>
          );
        } else {
          let temp = Math.abs(this.state.groupBalance[i].balance);
          balance.push(
            <h6>
              {this.state.groupBalance[i].name} owes {this.state.currency}{temp}
            </h6>
          );
        }
      }
    }
    if(balance.length===0){
      balance.push(
      <h6>
        No pending payments in this group.
      </h6>

      )
    }

    return (
      <div class="addexpense">
        {this.state.redirectVar}
        <Head />
        {errMsg}
        <div className="head">
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-secondary"
              id="dropdown-basic"
              size="lg"
            >
              {this.state.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.updateOpen}>
                Add a user
              </Dropdown.Item>
              <Dropdown.Item onClick={this.leaveGroup}>
                Leave Group
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br />
        </div>
        <Modal show={this.state.isOpen} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add an expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label>With you and All of {this.state.name}</label>
              <br />
              <input
                type="text"
                id="description"
                onChange={this.descriptionHandler}
                placeholder="Enter a description"
                required
              />
              <br />
              <br />
              <label>{this.state.currency}</label>
              <input
                type="text"
                id="amount"
                onChange={this.amountHandler}
                placeholder="0.00"
                required
              />
              <br />
              <br />
              <label>Paid By </label>
              <br />
              <select
                onChange={this.handleChange}
                value={this.state.paidmember}
                id="paidmember"
              >
                {this.state.members.map((member) => {
                  return <option value={member.email}> {member.name} </option>;
                })}
              </select>
              <br />
              <br />
              <label>Date:</label> <br />
              <input
                type="date"
                id="date"
                onChange={this.dateHandler}
                required
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.closeModal}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.updateOpen} onHide={this.updateClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <input
                type="text"
                id="username"
                onChange={this.nameChange}
                placeholder="Name"
                required
              />
              <br />
              <br />
              <input
                type="email"
                id="email"
                onChange={this.emailHandler}
                placeholder="Email"
                required
              />
              <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.addUser}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <div class="group">
          <div className="expenses">
            <h5>Expenses: </h5>
            <br />
            <br />
            {expenses}
            <br /> <br />
            <br />
            <Button variant="outline-danger" onClick={this.openModal}>
              Add an expense
            </Button>{" "}
            <Button variant="outline-success" onClick={this.settleUp}>
              Settle up
            </Button>{" "}
          </div>
          <div className="groupBalance">
            <label>Group Balance</label>
            {balance}
          </div>
        </div>
      </div>
    );
  }
}

export default Group;
