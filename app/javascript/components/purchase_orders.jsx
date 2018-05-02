import React from 'react';
import { AppRoutes } from 'support/appRoutes';
import { RecordsHelper } from 'support/recordsHelper';
import PurchaseOrder from './purchase_order';
import Loader from './loader';
import Paginator from './paginator';

export default class PurchaseOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResult: null
    };

    this.recordsHelper = new RecordsHelper(true, this.props);
    this.state.queryResult = this.recordsHelper.getBootstrapped();
  }

  render() {
    const page = this.recordsHelper.pageFromQuery();
    if(this.recordsHelper.needsFetch(this.state.queryResult, page)) {
      this.recordsHelper.fetchPage(AppRoutes.purchaseOrders, page, (data) => this.setState({queryResult: data}));
    }

    const posTable = (!this.state.queryResult) ? <Loader/> : (
      <table className="table table-bordered record-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {this.state.queryResult.results.map(function(po) {
            return <PurchaseOrder key={po.id} purchase_order={po} row={true}/>;
          })}
        </tbody>
      </table>
    );
    
    return (
      <div>
        <h1>Purchase Orders</h1>
        {posTable}
        <Paginator {...(this.state.queryResult ? this.state.queryResult.info : {})} page={page} path={AppRoutes.purchaseOrders}/>
      </div>
    );
  }
}
