import ReactDOM from 'react-dom';
import React from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import DataHOC from './component/data-hoc';
import Devices from './component/devices';

import config from './config';

const DevicesInstance = DataHOC([config.api.devices])(Devices);

const base = document.querySelector('base')
const baseHref = base ? base.getAttribute('href') : '/'
const renderApp = () => {
  ReactDOM.render(
    <BrowserRouter basename={baseHref.replace(/\/$/, '')}>
      <Switch>
        <Route path="/" exact={true} component={DevicesInstance} />
      </Switch>
    </BrowserRouter>, document.getElementById('container')
  );
};

//store.subscribe(renderApp);
renderApp();
