import React, { Component } from 'react';



class Header extends Component {


  render() {
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
      },
    }
    return (
        <h1 style={st.h}>RageFace</h1>
    );
  }
}


export default Header;
