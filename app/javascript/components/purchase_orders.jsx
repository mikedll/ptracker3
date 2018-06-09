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

    this.defaultQuery = {t: '', mt: ''};
    this.el = null;
    this.$el = null;
    
    this.props.recordsHelper.setDefaultMostRecentSearch(this);

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.$el = $(this.el);
  }
  
  handleSearchChange(e) {
    const formQuery = {
      t: this.$el.find('input[name=title]').val(),
      mt: parseFloat(this.$el.find('input[name=min_total]').val()) || ''
    };

    // Check equality of search query. If search name differs,
    // check whether the search names are long enough to merit a new filtering.
    if((this.state.mostRecentQuery.t === formQuery.t
        || (formQuery.t.length <= 2 && this.state.mostRecentQuery.t.length <= 2))
       && this.state.mostRecentQuery.mt === formQuery.mt)
      return;

    // Treat all search names that are too short as empty string searches. Should not
    // happen unless we are clearing a (length > 2) name search.
    if(formQuery.t.length <= 2) formQuery.t = '';

    this.props.recordsHelper.handleSearchChange(this, formQuery, AppRoutes.purchaseOrders);
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
      <div ref={el => this.el = el}>
        <Helmet>
          <title>Purchase Orders - Page {"" + page}</title>
        </Helmet>
        <h1>Purchase Orders</h1>
        <div className="form-query form-row align-items-center">
          <div className="col-auto">
            Search:
          </div>
          <div className="col-auto">
            <input name="title" type="text" placeholder="PO Title" defaultValue={this.state.mostRecentQuery.t} onChange={this.handleSearchChange} className="form-control"/>
          </div>
          <div className="col-auto">
            <input name="min_total" type="text" placeholder="Min Total" defaultValue={this.state.mostRecentQuery.mt} onChange={this.handleSearchChange} className="form-control"/>
          </div>
        </div>
        {posTable}
        <Paginator {...(this.state.queryResult ? this.state.queryResult.info : {})} page={page} path={AppRoutes.purchaseOrders}/>
      </div>
    );
  }
}
