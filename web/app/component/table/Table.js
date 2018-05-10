import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import _ from 'underscore';

const Table = (props) => {
  let columns = []
  let show;
  let width;
  if(typeof(props.data)!=='undefined' && typeof(props.data[0]!=='undefined')) {
    const accessors = _.keys(props.data[0])
    _.each(accessors, (val, idx) => {
      if(val === 'id' || val === 'accountId') {
        show = false;
      } else {
        show = true;
      }
      if(val === 'title') {
        width = 675;
      } else if (val.toLowerCase().includes('date')) {
        width = 240;
      } else if (val === 'hostName') {
        width = 260;
      } else if (val === 'os') {
        width = 300;
      } else if( val === 'lastScan') {
        width = 240;
      } else {
        width = Math.max(12*val.length, 180);
      }
      columns.push({
        'accessor': val,
        'Header': val.charAt(0).toUpperCase() + val.slice(1),
        'width': width,
        'show': show
      });
    })
  }
  const {data, ...otherProps} = props;
  return(
    <ReactTable
      {...otherProps}
      data={data}
      columns={columns}
    />
  )
}

export default Table;
