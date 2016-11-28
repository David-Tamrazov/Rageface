import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import GifSearch from './GifSearch';
import _ from 'lodash';
import {Button} from 'react-bootstrap';


const SortableItem = SortableElement(({value}) => <li style={listStyle.li}>
<img style={listStyle.i}src={value} alt="image is not available">
</img></li>);

var listStyle = {
  li: {
    listStyle: 'none',
    padding: '0.5em',
    float: 'left',
  },
  i:{
    width:'60px',
    height: '60px',
  },
}


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

    menu: {
      background: '#6199ce',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '10em',
      height: '100%',
      overflow: 'auto',

    },

    rFlow: {
      color: 'white',
      marginTop: '1.5em',
      marginLeft: '2em'
    }

  }
  var bb = {
    b:{
      marginLeft:'2em',
      marginBottom: '2em',
    }
  }

  return (

      <div style={styles.menu}>
        <h4><span style={styles.span}>&#9776; open</span></h4>
        <h4 style={styles.rFlow}><u>RageFlow</u></h4>
          <ul style={styles.ul}>
              {items.map((value, index) =>
                  <SortableItem key={`item-${index}`} index={index} value={value} />
                )}
                </ul>
        <Button style={bb.b} bsSize="small" bsStyle="danger">RageFace</Button>
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



    render() {
      var buttonSty={
        q:{
          marginRight: '15%',
          position: 'relative',
          bottom: '2.4em'

        },


      }
        return (
          <div>
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
            <Button style={buttonSty.q} bsStyle='success' onClick={this.save.bind(this)} >Queue It</Button>
          </div>
        )
    }
}

export default SortableComponent;
