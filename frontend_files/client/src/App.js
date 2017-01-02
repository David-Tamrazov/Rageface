import React, { Component } from 'react';
import GifSearch from './GifSearch';
import RageFlow from './RageFlow';
import SortableComponent from './SortableComponent';
import ReactAudioPlayer from 'react-audio-player';
import './App.css';


class App extends Component {
  constructor(){
    super()
    this.state = {
      value:false,
      noobs:[],
      myURL:'',
    }
  }

  onQueue(aURL){
    this.setState({myURL:aURL});
  }

  onUpdate(bool,valItems){
    this.setState({
      value: !bool,
      noobs: valItems,
    })
  }

  handleBack(aBool){
    this.setState({value: !this.state.value});
  }

  render() {
    const bootstrapUrl = "https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
//rgb(190,0,59) rgb(185,0,0)
    document.body.style.backgroundColor = "rgb(230,230,230)";
    //#cec5a7 ba
    //#6199ce blue
    //#aababf grey

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
        fontSize: '45px',
        float:'center',
        marginTop:'5%',
      },

      im:{
        width:'50px',
        height:'50px',
      },
    }
    return (
    <div>
      <link rel="stylesheet" href={bootstrapUrl}/>
      <div className="App">

        <h3 style={st.h}><img src="rock.png" style={st.im}/>  <strong>RageFace</strong>  <img src="rock.png" style={st.im}/></h3>

        {this.state.value ? <RageFlow flow={this.state.noobs} handleBack={this.handleBack.bind(this)} />
        : <GifSearch onQueue={this.onQueue.bind(this)}/>}

        <SortableComponent url={this.state.myURL} onUpdate={this.onUpdate.bind(this)} />



      </div>
    </div>
    );
  }
}

export default App;
