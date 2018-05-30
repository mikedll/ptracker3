import React from 'react';
import { AppRoutes } from 'support/appRoutes';
import { Helmet } from 'react-helmet';
import PurchaseOrder from './purchase_order';
import Loader from './loader';
import Paginator from './paginator';

export default class PurchaseOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResult: null
    };

    this.state.queryResult = this.props.recordsHelper.consumePluralBootstrap();
  }

  render() {
    if(this.props.recordsHelper.needsFetch(this.state.queryResult)) {
      this.props.recordsHelper.fetchPage(AppRoutes.purchaseOrders, (data) => this.setState({queryResult: data}));
    }

    const page = this.props.recordsHelper.pageFromQuery();

    const posTable = (!this.state.queryResult) ? <Loader/> : (
      <table className="table table-bordered record-table purchase-orders">
        <thead>
          <tr>
            <th>Title</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {this.state.queryResult.results.map(function(po) {
            return <PurchaseOrder key={po.id} record={po} row={true}/>;
          })}
        </tbody>
      </table>
    );
    
    return (
      <div>
        <Helmet>
          <title>Purchase Orders - Page {"" + page}</title>
        </Helmet>
        <h1>Purchase Orders</h1>
        {posTable}
        <Paginator {...(this.state.queryResult ? this.state.queryResult.info : {})} page={page} path={AppRoutes.purchaseOrders}/>
      </div>
    );
  }
}
