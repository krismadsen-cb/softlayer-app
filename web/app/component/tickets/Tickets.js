import React from 'react';
import _ from 'underscore';

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
          data={this.props.data[config.api.tickets]}
        />
      </div>
    );
  }
}

export default Devices;
