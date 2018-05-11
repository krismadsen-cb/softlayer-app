import React from 'react';

import DataHOC from '../data-hoc';
import Ips from '../ips';

import config from '../../config';

const SubnetSelector = (props) => {
  const IpsInstance = DataHOC([config.api.ips + '/' + props.match.params.subnetId])(Ips);
  return <IpsInstance {...props}/>
}

export default SubnetSelector;
