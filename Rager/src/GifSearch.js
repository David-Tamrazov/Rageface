import React, { Component } from 'react';
import axios from 'axios';
import {Button, InputGroup, FormControl, FormGroup } from 'react-bootstrap';
import _ from 'lodash';
class GifSearch extends Component {

  constructor(){
    super()
    this.state = {
      results : 'stringURL',
      query   : 'dank memes'
    }
  }

  getGif(obj){
    return {
      url: obj.images.downsized.url
    }
  }

  search(){

    const giphy = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC'

    axios.get(giphy)
      .then(resp => {
          this.setState({
            results: resp.data.data.image_url 
          });
        });
  }

  handleUpdate(name){
    //I'm flexin here but ask me whats going on, its 🔑
    return (event) => {
      this.setState({[name]: event.target.value})
    }
  }


  renderSearchBar(){
    return(
      <FormGroup>
        <InputGroup>
          <InputGroup.Button>
            <Button
             onClick={this.search.bind(this)}>
              Click Me
             </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    )
  }

  render() {
    return (
      <div>
      {this.renderSearchBar()}
        <img src = {this.state.results} />

      </div>
    );
  }
}


export default GifSearch;
