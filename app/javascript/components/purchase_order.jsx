import React from 'react';

import { amountFormat, MomentFormats } from 'support/utils';
import moment from 'moment';
import LineItems from './line_items';
import { Redirect } from 'react-router-dom';
import Loader from './loader';
import { RecordsHelper } from 'support/recordsHelper';
import { AppRoutes } from 'support/appRoutes';

export default class PurchaseOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseOrder: null
    };
    
    this.state.purchaseOrder = new RecordsHelper(false, this.props).getBootstrapped();
    if(!this.state.purchaseOrder)
      $.ajax({
        url: AppRoutes.purchaseOrder(this.props.match.params.id),
        dataType: 'JSON',
        success: (data) => this.setState({purchaseOrder: data})
      });

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick(e) {
    e.preventDefault();
    this.setState({redirect: true});
  }
  
  asRow() {
    if(!this.state.purchaseOrder) return (<Loader row={true} colspan={3}/>);

    if(this.state.redirect) return (<Redirect push to={AppRoutes.purchaseOrder(this.state.purchaseOrder.id)}/>);
    
    return (
      <tr onClick={this.handleRowClick}>
        <td>{this.state.purchaseOrder.title}</td>
        <td>{moment(this.state.purchaseOrder.date).format(MomentFormats.Time)}</td>
        <td>{amountFormat(this.state.purchaseOrder.total)}</td>
      </tr>
    );
  }

  asDetailed() {
    return (
      <div>
        <h3>{this.state.purchaseOrder.title}</h3>
        <LineItems data={this.state.purchaseOrder.line_items} purchase_order={this.state.purchaseOrder}/>;
      </div>
    );
  }
  
  render() {
    if(this.props.row) return this.asRow();

    return (!this.state.purchaseOrder ? (<Loader/>) : this.asDetailed());
  }
}
