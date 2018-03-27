import ReactDOM from 'react-dom';
import React from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import testComponent from './component/test-component';

const base = document.querySelector('base')
const baseHref = base ? base.getAttribute('href') : '/'
const renderApp = () => {
  ReactDOM.render(
    <BrowserRouter basename={baseHref.replace(/\/$/, '')}>
      <Switch>
        <Route path="/" component={testComponent} />
      </Switch>
    </BrowserRouter>, document.getElementById('container')
  );
};

//store.subscribe(renderApp);
renderApp();
