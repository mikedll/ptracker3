import React from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { AppRoutes } from 'support/appRoutes';
import Loader from './loader';

export default class Customer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      customer: null
    };

    this.state.customer = this.props.recordsHelper.consumeSingularBootstrap();

    if(!this.state.customer)
      $.ajax({
        url: AppRoutes.customer(this.props.match.params.id),
        dataType: 'JSON',
        success: (data) => this.setState({customer: data})
      });
    
  }

  render() {
    if(!this.state.customer) return (<Loader row={true} colspan={3}/>);
    
    return (
      <div>
        <Helmet>
          <title>Customer - {this.state.customer.first_name} {this.state.customer.last_name}</title>
        </Helmet>
        <h3>{this.state.customer.first_name} {this.state.customer.last_name}</h3>
        <div>
          Purchase Orders this customer has:
          <ul>
            {this.state.customer.purchase_orders.map(function(po) { return (<li>
              <Link to={AppRoutes.purchaseOrder(po.id)}>{po.title}</Link>
            </li>); } )}
          </ul>
        </div>
      </div>
    );
  }
}
