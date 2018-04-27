
import React from 'react';

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if(this.props.row) return (<tr><td colspan={this.props.colspan}>Loading...</td></tr>);
    
    return (<div>Loading...</div>);
  }
}

export default Loader;
