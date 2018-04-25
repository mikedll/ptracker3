import React from 'react';
import PurchaseOrder from './purchase_order';

export default class PurchaseOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchase_orders: null
    };
    if(this.props.data)
      this.state.purchase_orders = this.props.data;
    else
      this.state.purchase_orders = __purchase_orders;
  }

  render() {
    var purchaseOrders = this.state.purchase_orders.map(function(po) {
      return <PurchaseOrder key={po.id} purchase_order={po} row={true}/>;
    });
    
    return (
      <div>
        <h1>Purchase Orders</h1>

        <table className="table table-bordered record-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders}
          </tbody>
        </table>
      </div>
    );
  }
}
