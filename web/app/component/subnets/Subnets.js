import React, { Component } from 'react';

import Table from '../table';

import util from '../../util';
import config from '../../config';

import './table-override.css';

class Subnets extends React.Component {
  constructor(props) {
    super(props)
  }

  clickRow = (state, rowInfo, column, instance) => {
    return {
      onClick: e => {
        this.props.history.push('/ips/' + rowInfo.original.id)
      }
    }
  }

  render() {
    return (
      <div style={{padding: '10px 10px'}}>
        <Table
          showPageSizeOptions={false}
          defaultPageSize={25}
          filterable
          getTrProps={this.clickRow}
          defaultFilterMethod={util.Filter.by.contains}
          data={this.props.data[config.api.subnets]}
        />
      </div>
    );
  }
}

export default Subnets;
