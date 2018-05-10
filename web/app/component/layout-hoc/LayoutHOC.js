import React from 'react';

import Layout from '../layout';

const LayoutHOC = (Component) => {
  return class LC extends React.Component {
    constructor(props){
      super(props);
    }
    render() {
      return (
        <Layout>
          <Component {...this.props}/>
        </Layout>
      );
    }
  }
}

export default LayoutHOC;
