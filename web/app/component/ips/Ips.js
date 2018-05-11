import React, { Component } from 'react';

import DataHOC from '../data-hoc';
import Table from '../table';

import util from '../../util';
import config from '../../config';

const Ip = (props) => {
  return (
    <div style={{padding: '10px 10px'}}>
      <Table
        showPageSizeOptions={false}
        defaultPageSize={25}
        filterable
        defaultFilterMethod={util.Filter.by.contains}
        data={props.data[config.api.ips + '/' + props.match.params.subnetId]}
      />
    </div>
  );
}

export default Ip;
