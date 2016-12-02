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
    float: 'left',
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

    span: {
      marginLeft: '3.2em',
      color: 'white',
      cursor:'pointer',


    },



    rFlow: {
      color: 'black',
      marginLeft: '2em'
    }

  }



  return (

      <div >
        <h4 style={styles.rFlow}><strong><u>RageFlow</u></strong></h4>
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
        }

    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    };

    save(){
      var newArray = this.state.items.slice()
      newArray.push(this.props.url)
      this.setState({items:newArray})

    }

    update(){
      var l = _.size(this.state.items);
      if(l === 0){
        window.alert('Your RageFlow is empty! Press "Queue It" to add media to your flow.');
      }else{
      var newArr = this.state.items.slice();
      var val = newArr;
      this.props.onUpdate(val);
      }
    }

    render() {

      var bb = {

        menu: {
          background: '#6199ce',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10em',
          height: '100%',
          overflow: 'auto',
        },
        b:{
          marginLeft:'2em',
        },
        q:{
          marginRight: '8em',
          position: 'relative',
          bottom: '2.4em'

        },
      }
        return (
          <div>
          <div style={bb.menu}>
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />

            <Button style={bb.b} bsSize="small" bsStyle="danger" onClick={this.update.bind(this)}>RageFace</Button>
          </div>
          <Button style={bb.q} bsStyle='success' onClick={this.save.bind(this)}>Queue It</Button>
          </div>
        )
    }
}

export default SortableComponent;
