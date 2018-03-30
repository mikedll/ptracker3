import React from 'react';

var HelloMessage = React.createReactClass({
  render: function() {
    return (
      <h3>Hello {this.props.name}.</h3>
    );
  }
});
