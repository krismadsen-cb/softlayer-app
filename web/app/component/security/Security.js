import React from 'react';
import _ from 'underscore';

import Table from '../table';

import util from '../../util';
import config from '../../config';

class Security extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div style={{padding: '10px 10px'}}>
        <Table
          showPageSizeOptions={false}
          defaultPageSize={25}
          filterable
          defaultFilterMethod={util.Filter.by.contains}
          defaultSorted={[{id: 'hostName', desc: false}]}
          data={this.props.data[config.api.security.assets]}
        />
      </div>
    );
  }
}

export default Security;
