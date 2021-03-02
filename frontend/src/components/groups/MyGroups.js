import React, { Component } from 'react';
import axios from "axios";
import "./mygroups.css";
import {Button } from "react-bootstrap";


class MyGroups extends Component {
    constructor(props){
        super(props);
        this.state = {  
            groups : [],
            email: this.props.email
        }
    }  
    
    componentDidMount(){
        axios.get("http://localhost:3001/mygroups/", {params: {email:this.state.email}})
                .then((response) => {
                //update the state with the response data
                this.setState({
                    groups : this.state.groups.concat(response.data) 
                });
            });
    }

    createGroupPage(){
            window.location.href ='/creategroup'
    }
    loadGroupPage(){
        window.location.href ="/group"
    }

    render() { 
        const groups = this.state.groups.map((group) =>
  <li><Button variant="light" onClick={this.loadGroupPage} className="groupButtons" >{group}</Button></li>
);
       return(
           <div>
           <label class="groups">Groups </label> &nbsp; &nbsp; 
           <Button variant="link" class="addButton" onClick={this.createGroupPage} >
              +add
            </Button> 
            <div>
            {groups}
            <br/>
               
            </div>   
           </div>
       )
    }
}
 
export default MyGroups;
