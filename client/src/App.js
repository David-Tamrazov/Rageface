import React, { Component } from 'react';
import GifSearch from './GifSearch';
import RageFlow from './RageFlow';
import SortableComponent from './SortableComponent';
import ReactAudioPlayer from 'react-audio-player';
import './App.css';

var colors={
  bg:{
    backgroundColor: "#E0E0E0",
  }
}
class App extends Component {
  constructor(){
    super()
    this.state = {
      value:false,
      noobs:[],
    }
  }

  handleUpdate(vl,items){
    this.setState({
      value:!vl,
      noobs:items,
    });
  }

  render() {
    const bootstrapUrl = "https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"

    document.body.style.backgroundColor = "#aababf";
    //#cec5a7 ba
    //#6199ce blue
    //#aababf

    var st = {
      head: {
        background: 'green',
        width: '100%',
        height: '8em',
        position:'fixed',
        top:0,
      },

      h: {
        color: 'black',
        fontSize: '90px',
        float:'center',
        marginTop:0,
      },
    }
    return (
    <div>
      <link rel="stylesheet" href={bootstrapUrl}/>
      <div className="App">
        <h1 style={st.h}>RageFace</h1>,
        {this.state.value ? <RageFlow flow={this.state.noobs} handleUpdate={this.handleUpdate.bind(this)}/>
        : <GifSearch handleUpdate={this.handleUpdate.bind(this)}/>},


      </div>
    </div>
    );
  }
}

export default App;
