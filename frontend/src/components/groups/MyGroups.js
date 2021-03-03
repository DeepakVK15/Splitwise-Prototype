import React, { Component } from 'react';
import axios from "axios";
import "./mygroups.css";
import {Button } from "react-bootstrap";
import { Redirect } from "react-router";

class MyGroups extends Component {
    constructor(props){
        super(props);
        this.state = {  
            groups : [],
            email: this.props.email,
            redirect:null
        }
        this.loadGroupPage = this.loadGroupPage.bind(this);

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

    loadGroupPage(e){
        // window.location.href ="/group/"+e;
        // this.setState({redirect:<Redirect to='/group' />})
        console.log("correctly passed ",e);
        this.setState({redirect:<Redirect to={{
            pathname: '/group',
            state: { groupname: e }
        }}/>})
    }


    render() { 
        const groups = this.state.groups.map((group) =>
        <ul>
  <Button variant="light"  onClick={() => this.loadGroupPage(group)} className="groupButtons" >{group}</Button></ul>
);
       return(
           <div class="groups">
           <label>Groups </label> &nbsp; &nbsp; 
           <Button variant="link" class="addButton" onClick={this.createGroupPage} >
              +add
            </Button> 
            {groups}
            <br/>
               {this.state.redirect}
           </div>
       )
    }
}
 
export default MyGroups;
