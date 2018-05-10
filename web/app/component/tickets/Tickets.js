import React from 'react';
import _ from 'underscore';

import Layout from '../layout';
import Table from '../table';

import util from '../../util';
import config from '../../config';

class Devices extends React.Component {
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
          data={_.map(this.props.data[config.api.tickets], (val, idx) => { return _.mapObject(val, (v, i) => { return v === null ? '' : v }) })}
        />
      </div>
    );
  }
}

export default Devices;
