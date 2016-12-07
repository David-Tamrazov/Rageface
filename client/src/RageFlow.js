import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import _ from 'lodash';
import axios from 'axios';

class RageFlow extends Component {
  constructor(props){
    super(props)
      this.state = {
        flow: [],
        i:0,

    }
  }

  increment(){
    var len = _.size(this.props.flow)-1;
    if(this.state.i === len){
      this.setState({i:0});
    }else{
      this.setState({i:this.state.i+1});

    }
  }


  back(){
    this.props.handleBack(true);

  }


  save(){
    var saveflow = this.props.flow.slice();
    var token = 'Bearer ' + localStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.post['Content-Type']= 'application/json';
    axios.post('http://localhost:3001/saveflow', {
      flow : saveflow
    })
    .then(function (response) {
      console.log(response);
      alert("your flow's been saved");
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    var st = {
      image: {
        width: "50em",
        height: "30em",
        border: "3px solid black",
        float: 'center',
      },

      dv:{

      },

      back:{
        marginRight: '0.5em',
      },
      watch:{
        marginLeft: '0.5em',
      },
    }

    return (
      <div style={st.dv}>
        <img src={this.props.flow[this.state.i]} alt="Your browser doesn't support img" style={st.image}/>
        <br/>
        <br/>
        <Button bsStyle='success' bsSize="small" style={st.back} onClick={this.back.bind(this)}>Back to RageFace</Button>
        <Button bsStyle='primary' bsSize="small" style={st.watch} onClick={this.increment.bind(this)}>Watch RageFlow</Button>
        <Button bsStyle='primary' bsSize="small" style={st.watch} onClick={this.save.bind(this)}>Save to your account</Button>
      </div>
    );
  }
}


export default RageFlow;
