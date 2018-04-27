import React from 'react';
import PurchaseOrder from './purchase_order';
import Loader from './loader';
import Paginator from './paginator';

export default class PurchaseOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseOrders: null,
      queryInfo: null
    };
    if(this.props.data)
      this.state.purchaseOrders = this.props.data;
    else
      if(typeof(BootstrappedData.query_result) !== 'undefined') {
        this.state.purchaseOrders = BootstrappedData.query_result.results;
        this.state.queryInfo = BootstrappedData.query_result.info;
        delete BootstrappedData.query_result;
      }
      else
        $.ajax({
          url: AppRoutes.purchaseOrders,
          data: { page: getUrlParameter('page')},
          dataType: 'JSON',
          success: (data) => this.setState({purchaseOrders: data.results, queryInfo: data.info})
        });
  }

  render() {
    if (!this.state.purchaseOrders) return (<Loader/>);
    var purchaseOrders = this.state.purchaseOrders.map(function(po) {
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

        <Paginator {...this.state.queryInfo} path={AppRoutes.purchaseOrders}/>
      </div>
    );
  }
}
