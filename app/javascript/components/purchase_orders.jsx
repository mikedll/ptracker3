import React from 'react';
import PurchaseOrder from './purchase_order';

export default class PurchaseOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchase_orders: this.props.data
    };
  }

  render() {
    var purchaseOrders = this.state.purchase_orders.map(function(po) {
      return <PurchaseOrder key={po.id} purchase_order={po} row={true}/>;
    });
    
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders}
        </tbody>
      </table>
    );
  }
}
