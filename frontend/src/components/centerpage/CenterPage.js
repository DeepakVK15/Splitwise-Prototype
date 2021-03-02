import React, { Component } from "react";
import "./centerpage.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";

class CenterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      transactions: [],
      isOpen: false,
      modalEmail: "",
    };
    this.modalEmailHandler = this.modalEmailHandler.bind(this);

    //   this.display = this.display.bind(this);
  }
  modalEmailHandler = (e) => {
    this.setState({
      modalEmail: e.target.value,
    });
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => {
    const data = {
      email: cookie.load("cookie"),
      modalEmail: this.state.modalEmail,
    };
    console.log("Centerpage ", data.modalEmail);
    axios.post("http://localhost:3001/modal", data);
    this.setState({ isOpen: false });
    window.location.reload(true);
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/dashboard/", {
        params: { email: this.state.email },
      })
      .then((response) => {
        //update the state with the response data
        this.setState({
          transactions: this.state.transactions.concat(response.data),
        });
      });
  }

  render() {
    let total_amount = 0;
    let you_owe = 0;
    let owed = 0;
    let oweList = [];
    let owedList = [];
    //if not logged in go to login page
    for (var i = 0; i < this.state.transactions.length; i++) {
      if (this.state.transactions[i].lenderid === this.state.email) {
        total_amount += this.state.transactions[i].amount;
        owed += this.state.transactions[i].amount;
        let obj = {
          email: this.state.transactions[i].borrowerid,
          amount: this.state.transactions[i].amount,
        };
        owedList.push(obj);
      } else {
        total_amount -= this.state.transactions[i].amount;
        you_owe += this.state.transactions[i].amount;
        let obj = {
          email: this.state.transactions[i].lenderid,
          amount: this.state.transactions[i].amount,
        };
        oweList.push(obj);
      }
    }

    let displayowedDetails = owedList.map((transaction) => {
      return (
        <div>
          <label>
            {transaction.email} owes ${transaction.amount}
          </label>
          <br />
        </div>
      );
    });

    let displayoweDetails = oweList.map((transaction) => {
      return (
        <div class="oweDetails">
          <label>
            You owe ${transaction.amount} to {transaction.email}{" "}
          </label>
          <br />
        </div>
      );
    });

    return (
      <div className="center">
        <h2>{this.props.page}</h2>&nbsp; &nbsp;&nbsp;
        <Button variant="danger" className="buttons">
          Add an expense
        </Button>
        &nbsp; &nbsp;&nbsp;
        <Button variant="success" onClick={this.openModal}>
          Settle up
        </Button>
        <label class="money">Total balance: ${total_amount}</label>
        <label class="money">You owe: ${you_owe}</label>
        <label class="money">You are owed: ${owed}</label>
        <div class="details">
          {displayowedDetails}
          {displayoweDetails}
        </div>
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Settle up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label>With you and :</label>
              <input
                type="text"
                id="modalEmail"
                onChange={this.modalEmailHandler}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.closeModal}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CenterPage;
