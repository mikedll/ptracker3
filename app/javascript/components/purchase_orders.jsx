import React from 'react';
import PurchaseOrder from './purchase_order';
import Loader from './loader';

export default class PurchaseOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchase_orders: null
    };
    if(this.props.data)
      this.state.purchase_orders = this.props.data;
    else
      if(typeof(BootstrappedData.purchase_orders) !== 'undefined') {
        this.state.purchase_orders = BootstrappedData.purchase_orders;
        delete BootstrappedData.purchase_orders;
      }
      else
        $.ajax({
          url: AppRoutes.purchaseOrders,
          dataType: 'JSON',
          success: (data) => this.setState({purchase_orders: data})
        });
  }

  render() {
    if (!this.state.purchase_orders) return (<Loader/>);
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
