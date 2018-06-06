import React from 'react';
import { Helmet } from 'react-helmet';

import { AppRoutes } from 'support/appRoutes';
import PurchaseOrder from './purchase_order';
import Loader from './loader';
import Paginator from './paginator';

export default class PurchaseOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResult: this.props.recordsHelper.consumePluralBootstrap(),
      searching: false
    };

    this.props.recordsHelper.setDefaultMostRecentSearch(this);

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e) {
    this.props.recordsHelper.handleSearchChange(this, e, AppRoutes.purchaseOrders);
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
        <input name="search" type="text" placeholder="Search" defaultValue={this.state.mostRecentSearch} onChange={this.handleSearchChange} className="mb"/>
        {posTable}
        <Paginator {...(this.state.queryResult ? this.state.queryResult.info : {})} page={page} path={AppRoutes.purchaseOrders}/>
      </div>
    );
  }
}
