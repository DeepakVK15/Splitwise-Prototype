import axios from "axios";
import React, { Component } from "react";
import { Modal, Button, Navbar, Nav } from "react-bootstrap";
import cookie from "react-cookies";
import "./mygroups.css";
import head from "./logo.png";
import { Redirect } from "react-router";

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
      groupBalance:[]
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
      .get("http://localhost:3001/group/", {
        params: { name: this.state.name}
      })
      .then((response) => {
        // update the state with the response data
        this.setState({
          expenses: this.state.expenses.concat(response.data),
        });
      });
    axios
      .get("http://localhost:3001/members", {
        params: { name: this.state.name },
      })
      .then((response) => {
        this.setState({
          members: this.state.members.concat(response.data),
        });
      })
           
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => {
    const data = {
      description: this.state.description,
      paid_by: this.state.paidmember,
      groupname: this.state.name,
      amount: this.state.amount,
      date: this.state.date,
    };
    axios.post("http://localhost:3001/group", data);

    this.setState({ isOpen: false });
    window.location.reload(true);
  };
  close = () => {
    this.setState({ isOpen: false });
  };
  landingPage = () => {
    this.setState({ redirectVar: <Redirect to="/" /> });
    cookie.remove("cookie");
  };

  dashBoard = () => {
    this.setState({ redirectVar: <Redirect to="/dashboard" /> });
  };

  testBalance = () => {
    axios.get("http://localhost:3001/groupbalances",
                {params: {names:this.state.members, groupname:this.state.name},
      }).then((response)=>{
          const obj ={
              name : "deepak@gmail.com",
              balance : response.data
          }
          this.state.groupBalance.push(obj);
      })
  }



  render() {
    let expenses = this.state.expenses.map((expense) => (
      <h6>
        {expense.date.split("T")[0]} &nbsp; {expense.description} &nbsp;{" "}
        {expense.name} &nbsp;${expense.amount}
      </h6>
    ));
    
    if (expenses.length === 0) {
      expenses = <h4>No expenses to show.</h4>;
    }

    return (
      <div class="addexpense">
        {this.state.redirectVar}
        <Navbar bg="light" variant="light">
          <Nav className="container-fluid">
            <img
              alt=""
              src={head}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
            <div class="split">Splitwise</div>

            <Nav.Item className="ml-auto">
              <Button variant="light" onClick={this.dashBoard}>
                Dashboard
              </Button>
              <Button variant="success" onClick={this.landingPage}>
                Logout
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
        <div className="head">
          <h4>{this.state.name}</h4>
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
              <label>$</label>
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
                  return <option value={member.name}> {member.name} </option>;
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
        <div className="expenses">
          <h5>Expenses: </h5>
          <br />
          <br />
          {expenses}
          <br /> <br />
          <br />
          <Button variant="danger" onClick={this.openModal}>
            Add an expense
          </Button> <Button variant="success" >
          Settle up
        </Button>
        <Button variant="success" onClick={this.testBalance} >
          Balances
        </Button>
          
        </div>
      </div>
    );
  }
}

export default Group;
