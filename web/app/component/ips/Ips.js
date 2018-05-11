import React, { Component } from 'react';

import DataHOC from '../data-hoc';
import Table from '../table';

import util from '../../util';
import config from '../../config';

class Ip extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{padding: '10px 10px'}}>
        <Table
          showPageSizeOptions={false}
          defaultPageSize={25}
          filterable
          defaultFilterMethod={util.Filter.by.contains}
          data={this.props.data[config.api.ips + '/' + this.props.match.params.subnetId]}
        />
      </div>
    );
  }
}

export default Ip;
