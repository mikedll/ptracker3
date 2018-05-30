
import React from 'react';
import { Helmet } from 'react-helmet';
import { AppRoutes } from 'support/appRoutes';
import Loader from './loader';
import Paginator from './paginator';
import Customer from './customer';

export default class Customers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      queryResult: null
    };

    this.state.queryResult = this.props.recordsHelper.consumePluralBootstrap();

  }

  render() {
    if(this.props.recordsHelper.needsFetch(this.state.queryResult)) {
      this.props.recordsHelper.fetchPage(AppRoutes.customers, (data) => this.setState({queryResult: data}));
    }

    const page = this.props.recordsHelper.pageFromQuery();

    const rows = (!this.state.queryResult) ? null : this.state.queryResult.results.map((c) => {
      return (
        <Customer row={true} record={c}/>
      );
    });
    
    const csTable = (!this.state.queryResult) ? <Loader/> : (
      <table className="table table-bordered record-table customers">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
    
    return (
      <div>
        <Helmet>
          <title>Customers - Page {'' + page}</title>
        </Helmet>
        <h1>Customers</h1>
        {csTable}
        <Paginator {...(this.state.queryResult ? this.state.queryResult.info : {})} page={page} path={AppRoutes.customers}/>          
      </div>
    );
  }
}
