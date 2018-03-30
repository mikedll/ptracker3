import React from 'react';

export default class AmountBox extends React.Component {
  render() {
    return(
      <div className="col-md-4">
        <div className={'card mb-3 bg-' + this.props.type}>
          <div className="card-header">{this.props.text}</div>
          <div className="card-body">{amountFormat(this.props.amount)}</div>
        </div>
      </div>
    );
  }
}
