import React, { Component } from 'react';
import GifSearch from './GifSearch';
import './App.css';

class App extends Component {

  render() {
    const bootstrapUrl = "https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
    return (
    <div>
      <link rel="stylesheet" href={bootstrapUrl}/>
      <div className="App">
          <GifSearch/>
      </div>
    </div>
    );
  }
}

export default App;
