import React, { Component } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import _ from 'lodash';
import SortableComponent from './SortableComponent';


class GifSearch extends Component {

  constructor(){
    super()
    this.state = {
      results : '',
      data: [],

    }

    const giphURL = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC'
    axios.get(giphURL)
      .then(resp => {
          this.setState({
            results: resp.data.data.image_url
          });
        });
  }

  search(){
    var tags = ["Kermit", "Zombies", "Dank+Memes", "Food",
    "Harambe", "Russia", "Coyotes", "Beer" ,
    "Unicycles" , "Martial+Arts", "Falling", "fat+people", "Star+Wars", "The+Simpsons", "Pokemon",
    "Trump", "LSD", "Cars", "Poop", "Dank+Memes", "Dank+Memes", "Kermit", "Joe+Biden",
    "Baby", "Poutine", "Spears", "Shoes", "LOL", "Kittens", "Puppy", "Spilled+drinks"
  , "Geese", "Harambe", "Lightsabers", "Crashes", "Twerk", "Rainbows", "Memes", "Memes", "Guitars", "Kanye+West",
   "Tackles", "Speed", "Football", "Jukes", "Soccer", "Michael+Jordan", "Kittens", "Al+Capone","The+Godfather", "Beards"
, "Bears", "Peanut+Butter", "Explosions", "Bacon", "The+Office", "Disney","Wet+Hot+American+Summer",
"Weed", "Rainbows", "Kittens", "Rainbows", "Joints", "Girls", "The+Simpsons", "The+Simpsons", "The+Simpsons",
"Joe+Biden", "Obama", "Obama+Biden", "Tacos", "Cartoons", "The+Office", "Family+Guy", "Archer", "Archer",
 "Archer","Always+Sunny+In+Philidelphia", "Beer", "Ninjas", "Rainbows", "Kermit", "Obama",
"Bernie+Sanders", "Snoopy", "Snoopy", "Snoopy", "Snoopy"]

    var str = '&tag='
    var len = _.size(tags)-1
    var ran = _.random(0,len)
    var temp = tags[ran]

    {/*determines if we present a giph or reddit image */}
    var coin = _.random(0,1)

    const giphURL = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC'+str+temp

      axios.get(giphURL)
        .then(resp => {
            this.setState({
              results: resp.data.data.image_url
            });
          });
  }

  onUpdate(val){
    this.doWork(false,val);
  }

  doWork(bool,array){
    this.props.handleUpdate(bool,array);

  }

  render() {
    var sty = {
      image: {
        width: "50em",
        height: "30em",
        marginTop: '4em',
        border: "3px solid black",

      },

      mid: {
        marginTop: '-4em',
        float: 'center',
      },

      bu:{
        marginLeft: '5em',
      }
    }

    return (
      <div style={sty.mid}>
        <img src={this.state.results} alt="" style={sty.image}/>

        <br>
        </br>
        <br>
        </br>

        <Button style={sty.bu} bsStyle='primary' onClick={this.search.bind(this)}>Rage On</Button>
        <SortableComponent url={this.state.results} onUpdate={this.onUpdate.bind(this)}/>

      </div>
    );
  }
}


export default GifSearch;
