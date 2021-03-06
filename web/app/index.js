import ReactDOM from 'react-dom';
import React from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import DataHOC from './component/data-hoc';
import Devices from './component/devices';
import Events from './component/events';
import LayoutHOC from './component/layout-hoc';
import Security from './component/security';
import Subnets from './component/subnets';
import SubnetSelector from './component/subnet-selector';
import Tickets from './component/tickets';

import config from './config';

const DevicesInstance = DataHOC([config.api.devices])(LayoutHOC(Devices));
const EventsInstance = DataHOC([config.api.events])(LayoutHOC(Events));
const SubnetSelectorInstance = LayoutHOC(SubnetSelector);
const SecurityInstance = DataHOC([config.api.security.assets])(LayoutHOC(Security));
const SubnetsInstance = DataHOC([config.api.subnets])(LayoutHOC(Subnets));
const TicketsInstance = DataHOC([config.api.tickets])(LayoutHOC(Tickets));

const base = document.querySelector('base')
const baseHref = base ? base.getAttribute('href') : '/'
const renderApp = () => {
  ReactDOM.render(
    <BrowserRouter basename={baseHref.replace(/\/$/, '')}>
      <Switch>
        <Route path="/" exact={true} render={() => <Redirect to="/devices"/>} />
        <Route path="/devices" exact={true} component={DevicesInstance} />
        <Route path="/events" exact={true} component={EventsInstance} />
        <Route path="/ips/:subnetId" exact={true} component={SubnetSelectorInstance} />
        <Route path="/security" exact={true} component={SecurityInstance} />
        <Route path="/subnets" exact={true} component={SubnetsInstance} />
        <Route path="/tickets" exact={true} component={TicketsInstance} />
      </Switch>
    </BrowserRouter>, document.getElementById('container')
  );
};

//store.subscribe(renderApp);
renderApp();
