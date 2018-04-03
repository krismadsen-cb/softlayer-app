import React from 'react';

const DataHOC = (endpoints) => {
  return (Component) => {
    return class DC extends React.Component {
      constructor(props){
        super(props);
        this.state = {
          'data': {}
        }
      }
      componentDidMount() {
        this.fetchData(endpoints)
      }
      fetchData = (endpoints) => {
        for(let endpoint of endpoints) {
          fetch(endpoint, {credentials: 'include'})
          .then((response) => {return response.json()})
          .then((json) => { this.update(endpoint, json) })
        }
      }
      update = (endpoint, upsert) => {
        let orig = Object.assign({}, this.state.data);
        orig[endpoint] = upsert;
        this.setState({
          'data': orig
        })
      }
      render() {
        return <Component {...this.props} {...this.state}/>
      }
    }
  }
}

export default DataHOC;
