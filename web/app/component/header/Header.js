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
            to={'/devices'}
            className={'nav-item'}
            activeClassName={'nav-item nav-active'}
            >
            Devices
          </NavLink>
          <NavLink
            exact
            to={'/events'}
            className={'nav-item'}
            activeClassName={'nav-item nav-active'}
            >
            Events
          </NavLink>
          <NavLink
            exact
            to={'/security'}
            className={'nav-item'}
            activeClassName={'nav-item nav-active'}
            >
            Security
          </NavLink>
          <NavLink
            exact
            to={'/tickets'}
            className={'nav-item'}
            activeClassName={'nav-item nav-active'}
            >
            Tickets
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Header;
