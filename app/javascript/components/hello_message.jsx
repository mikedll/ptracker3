import React from 'react';

export default class HelloMessage extends React.Component {
  render: function() {
    return (
      <h3>Hello {this.props.name}.</h3>
    );
  }
}
