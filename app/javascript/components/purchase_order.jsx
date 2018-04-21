import React from 'react';
import moment from 'moment';
import LineItems from './line_items';

export default class PurchaseOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  asRow() {
    return (
      <tr>
        <td>{this.props.purchase_order.title}</td>
        <td>{moment(this.props.purchase_order.date).format(MomentFormats.Time)}</td>
        <td><a href={'/purchase_orders/' + this.props.purchase_order.id}>View</a></td>
      </tr>
    );
  }

  asDetailed() {
    return (
      <div>
        <a href={AppRoutes.root}>Purchase Orders</a>
        <br/>
        <h3>{this.props.purchase_order.title}</h3>
        <LineItems data={this.props.purchase_order.line_items} purchase_order={this.props.purchase_order}/>;
      </div>
    );
  }
  
  render() {
    return this.props.row ? this.asRow() : this.asDetailed();
  }
}
