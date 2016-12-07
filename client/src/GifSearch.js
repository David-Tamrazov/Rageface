import React, { Component } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import _ from 'lodash';
import SortableComponent from './SortableComponent';


class GifSearch extends Component {

  constructor(props){
    super(props)
    this.state = {
      results : '',
      data: [],

    }
    //http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC
//http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=5
    const giphURL = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC'
    axios.get(giphURL)
      .then(resp => {
          this.setState({
            results: resp.data.data.image_url
          });
        });
  }

  search(){
    var tags = ["Kermit", "Zombies", "Dank+Memes",
    "Harambe", "Coyotes", "Beer" , "Vomit", "Unicycles" , "Martial+Arts", "Falling", "fat+people",
     "Star+Wars", "The+Simpsons", "Pokemon", "Trump", "LSD", "Cars", "Poop", "Dank+Memes", "Dank+Memes", "Kermit", "Joe+Biden", "Poutine", "Spears",
     "Shoes", "LOL", "Kittens", "Puppy", "Spilled+drinks", "Geese", "Harambe", "Lightsabers", "Crashes", "Twerk",
      "Rainbows", "Memes", "Memes", "Guitars", "Kanye+West",
   "Tackles", "Football", "Jukes", "Soccer", "Michael+Jordan", "Kittens", "Al+Capone","The+Godfather", "Beards"
, "Bears", "Peanut+Butter", "Explosions", "Bacon", "The+Office","Wet+Hot+American+Summer",
"Weed", "Rainbows", "Kittens", "Joints", "Girls", "The+Simpsons",
"Joe+Biden", "Obama", "Obama+Biden", "Tacos", "Cartoons", "Family+Guy", "Archer",
 "Archer","Always+Sunny+In+Philidelphia", "Beer", "Ninjas", "Kermit", "Obama",
"Bernie+Sanders", "Snoopy", "Bombs", "Fire", "Paper+Towels", "Construction",
"Women", "Bathing", "Hot+Tubs", "Archery", "Hammers", "Guns", "Ryan+Lochte", "Ryan+Lochte"
, "Ryan+Lochte", "tricycle", "water+slides", "Harambe", "ham", "helicopters", "ham"]

    var str = '&tag=';
    var len = _.size(tags)-1;
    var ran = _.random(0,len);
    var temp = tags[ran];


    /*determines if we present a giph or reddit image */
    var coin = _.random(0,1)
//http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=1
//'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC'+str+temp
    const giphURL = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC'+str+temp
      axios.get(giphURL)
        .then(resp => {
            this.setState({
              results: resp.data.data.image_url
            });
          });

    const giphURL1 = 'http://localhost:3001/getgifs'
      axios.get(giphURL1)
        .then(resp => {
            this.setState({
              results: resp.data.data.image_url
            });
          });
  }



  doWork(bool,array){
    this.props.handleUpdate(bool,array);

  }

  save(){
    /*var newArray = this.state.items.slice()
    newArray.push(this.props.url)
    this.setState({items:newArray})*/
    this.props.onQueue(this.state.results);

  }


  render() {
    var sty = {
      image: {
        width: "50em",
        height: "30em",
        border: "3px solid black",
      },

      mid: {

        float: 'center',
      },

      bu:{
        marginRight: '0.5em',
      },
      q:{
         marginLeft: '0.5em',
      },
    }

    return (
      <div style={sty.mid}>
        <img src={this.state.results} alt="" style={sty.image}/>

        <br/>
        <br/>
        <Button  style={sty.bu} bsStyle='success' onClick={this.save.bind(this)}>Queue It</Button>
        <Button style={sty.q} bsStyle='primary' onClick={this.search.bind(this)}>Rage On</Button>

      </div>
    );
  }
}


export default GifSearch;
