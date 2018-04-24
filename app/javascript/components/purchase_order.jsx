import React from 'react';
import moment from 'moment';
import LineItems from './line_items';

export default class PurchaseOrder extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick(e) {
    e.preventDefault();
    window.location.href = AppRoutes.purchaseOrder(this.props.purchase_order.id);
  }

  asRow() {
    return (
      <tr onClick={this.handleRowClick}>
        <td>{this.props.purchase_order.title}</td>
        <td>{moment(this.props.purchase_order.date).format(MomentFormats.Time)}</td>
        <td>{amountFormat(this.props.purchase_order.total)}</td>
      </tr>
    );
  }

  asDetailed() {
    return (
      <div>
        <h3>{this.props.purchase_order.title}</h3>
        <LineItems data={this.props.purchase_order.line_items} purchase_order={this.props.purchase_order}/>;
      </div>
    );
  }
  
  render() {
    return this.props.row ? this.asRow() : this.asDetailed();
  }
}
