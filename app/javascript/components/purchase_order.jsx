import React from 'react';
import moment from 'moment';

export default class PurchaseOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.purchase_order.title}</td>
        <td>{moment(this.props.purchase_order.date).format('MMMM Do YYYY, h:mm a')}</td>
        <td><a href={'/purchase_orders/' + this.props.purchase_order.id}>View</a></td>
      </tr>
    );
  }
}
