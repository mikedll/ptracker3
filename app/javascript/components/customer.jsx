import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AppRoutes } from 'support/appRoutes';
import Loader from './loader';

export default class Customer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      customer: this.props.row ? this.props.record : null,
      redirect: false
    };

    if(!this.state.customer && this.props.recordsHelper) {
      this.state.customer = this.props.recordsHelper.consumeSingularBootstrap();
    }
    
    this.handleRowClick = this.handleRowClick.bind(this);

    if(!this.state.customer)
      $.ajax({
        url: AppRoutes.customer(this.props.match.params.id),
        dataType: 'JSON',
        success: (data) => this.setState({customer: data})
      });
    
  }

  handleRowClick(e) {
    e.preventDefault();
    this.setState({redirect: true});
  }

  address() {
    return (this.state.customer.address1 + ", "
            + this.state.customer.city
            + ", " + this.state.customer.state
            + " " + this.state.customer.zip_code);
  }
  render() {
    if(!this.state.customer) return (<Loader row={this.props.row} {...(this.props.row ? {colspan: 6} : {})}/>);

    if(this.state.redirect) return <Redirect push to={AppRoutes.customer(this.state.customer.id)}/>;
    return this.props.row ? (
      <tr key={this.state.customer.id} onClick={this.handleRowClick}>
        <td>{this.state.customer.first_name}</td>
        <td>{this.state.customer.last_name}</td>
        <td>{this.state.customer.address1}</td>
        <td>{this.state.customer.city}</td>
        <td>{this.state.customer.state}</td>
        <td>{this.state.customer.zip_code}</td>
      </tr>
    ) : (
      <div>
        <Helmet>
          <title>Customer - {this.state.customer.first_name} {this.state.customer.last_name}</title>
        </Helmet>
        <h3>{this.state.customer.first_name} {this.state.customer.last_name}</h3>
        <div>
          <div>Address:</div>
          <div>
            {this.address()}
          </div>          
        </div>
        <br/>
        <div>
          This customer has the following purchase orders:
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
