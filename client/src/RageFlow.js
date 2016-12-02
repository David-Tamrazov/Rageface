import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import _ from 'lodash';





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
    this.props.handleUpdate(true,this.state.flow)

  }


  render() {
    var st = {
      image: {
        width: "50em",
        height: "30em",
        marginTop: '1em',
        border: "3px solid black",
        float: 'center',
      },
      back:{
        padding: "1em",
        marginRight: '1em',
      },
      watch:{
        padding: "1em",
        marginLeft: '1em',
      },
    }

    return (
      <div>
        <img src={this.props.flow[this.state.i]} alt="Your browser doesn't support img" style={st.image}/>
        <br/>
        <br/>
        <Button bsStyle='success' bsSize="small" style={st.back} onClick={this.back.bind(this)}>Back to RageFace</Button>
        <Button bsStyle='primary' bsSize="small" style={st.watch} onClick={this.increment.bind(this)}>Watch RageFlow</Button>
      </div>
    );
  }
}


export default RageFlow;
