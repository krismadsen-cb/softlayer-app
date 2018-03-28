import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import _ from 'underscore';

const Table = (props) => {
  let columns = []
  if(typeof(props.data)!=='undefined' && typeof(props.data[0]!=='undefined')) {
    const accessors = _.keys(props.data[0])
    _.each(accessors, (val, idx) => {
      columns.push({
        'accessor': val,
        'Header': val.charAt(0).toUpperCase() + val.slice(1)
      })
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
