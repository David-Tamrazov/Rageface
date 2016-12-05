import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import GifSearch from './GifSearch';
import _ from 'lodash';
import {Button} from 'react-bootstrap';

var listStyle = {
  li: {
    color: 'black',
    padding: '0.5em',
  },

  i:{
    width:'70px',
    height: '60px',
  },
}

const SortableItem = SortableElement(({value}) => <li style={listStyle.li}>
<img style={listStyle.i}src={value} alt="">
</img></li>);



const SortableList = SortableContainer(({items}) => {
  var styles = {
    ul: {
      color: 'white',
      marginTop: '1em',

    },

    rFlow: {
      color: 'rgb(230,230,230)',
    },

    im:{
      width: '25px',
      height: '25px',


    },

    dv:{
      display: 'inline-block',
    }

  }



  return (

      <div >
        <div style = {styles.dv}>
          <h4 style={styles.rFlow}><img src="ggg.png" style={styles.im}/><strong> RageFlow </strong><img src="ggg.png" style={styles.im}/></h4>
        </div>
          <ol style={styles.ul}>
              {items.map((value, index) =>
                  <SortableItem key={`item-${index}`} index={index} value={value} />
                )}
          </ol>

      </div>

    );
});


class SortableComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
          url: '',
          items: [],
          size: 0,
        }

    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    };


    update(){
      var l = _.size(this.state.items);
      if(l === 0){
        window.alert('Your RageFlow is empty! Press "Queue It" to add media to your flow.');
      }else{
        var arr = this.state.items.slice();
        var rageItems = arr;
        this.props.onUpdate(false,rageItems);
      }
    }

    /* This method is only called when THE PROPS CHANGE aka we can't queue the same item twice */
    componentWillReceiveProps(nextProps) {
      if(JSON.stringify(this.props.url) !== JSON.stringify(nextProps.url)) // Check if it's a new user, you can also use some unique, like the ID
      {
           this.itemUpdate(nextProps.url);
      }

    }


    itemUpdate(obj){
      this.setState({url:obj})
      var sz = _.size(this.state.items);

      if(sz === 0){
        var ugh = [obj];
        this.setState({items:ugh});
      }else{
        var newArray = this.state.items.slice();
        newArray.push(obj);
        this.setState({items:newArray});

      }
    }



    render() {

      var bb = {
//#6199ce  rgb(48,144,0)  #FF6600
        menu: {
          background: 'rgb(185,0,0)',
          position:'fixed',
          top:0,
          left:0,
          width: '11em',
          height: '100%',
          overflow:'auto',
          borderRight: '4px solid black',

        },
        b:{
          marginLeft:'30%',
        },



      }
        return (

            <div style={bb.menu}>
              <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
              <Button style={bb.b} bsSize="small" bsStyle="primary" onClick={this.update.bind(this)}>RageFace</Button>
            </div>

        )
    }
}

export default SortableComponent;
