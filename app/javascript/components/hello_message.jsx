import React from 'react';

export default class HelloMessage extends React.Component {
  render() {
    return (
      <h3>Hello {this.props.name}.</h3>
    );
  }
}
