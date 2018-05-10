import React, { Component } from 'react';

import Footer from '../footer';
import Header from '../header';

class Layout extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <Header/>
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

export default Layout;
