import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import './style.css'

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'navbar-wrapper'}>
        <div className={'navbar'}>
          <NavLink
            exact
            to={'/'}
            className={'nav-item'}
            activeClassName={'nav-item nav-active'}
            ></NavLink>
          </div>
        </div>
    )
  }
}

export default Header;
