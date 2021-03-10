import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import axios from "axios";


class UpdateGroup extends Component {
    constructor(props) {
        super(props);
    this.state = {
        groupname:this.props.location.state.groupname,
        friends:[]
    }
    this.groupnameHandler = this.groupnameHandler.bind(this);

}

updateGroup =() =>{
    if(this.state.groupname===""){
        this.setState({errCode:"Group should have a name."});
      }

      const data = {
          groupname:this.state.groupname,
          members:this.state.members,
          oldname:this.props.location.state.groupname
      }
      axios.post("http://localhost:3001/updateGroup", data)

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

  addClick() {
    this.setState((prevState) => ({
      friends: [...prevState.friends, { name: "", email: "" }],
    }));
  }
  groupnameHandler = (e) => {
    this.setState({
      groupname: e.target.value,
    });
  };

    render() { 
        return (
           <div>
           <input
           type="text"
           id="groupname"
           onChange={this.groupnameHandler}
          value={this.state.groupname}
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
              onClick={this.updateGroup}
            >
              Save
            </button>
           
           
           </div>
          );
    }
}
 
export default UpdateGroup;