
import React from 'react';
import { Helmet } from 'react-helmet';
import { AppRoutes } from 'support/appRoutes';
import Loader from './loader';
import Paginator from './paginator';

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
        <tr key={c.id}>
          <td>{c.first_name}</td>
          <td>{c.last_name}</td>
          <td>{c.address1}</td>
          <td>{c.city}</td>
          <td>{c.state}</td>
          <td>{c.zip_code}</td>
        </tr>
      );
    });
    
    const csTable = (!this.state.queryResult) ? <Loader/> : (
      <table className="table table-bordered customers">
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
        <h3>Customers</h3>
        {csTable}
        <Paginator {...(this.state.queryResult ? this.state.queryResult.info : {})} page={page} path={AppRoutes.customers}/>          
      </div>
    );
  }
}
