import React from 'react';
import moment from 'moment';
import LineItems from './line_items';
import { Redirect, Link } from 'react-router-dom';

export default class PurchaseOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseOrder: props.purchase_order
    };
    
    if(!this.state.purchaseOrder)
      if(typeof(__purchase_order) !== 'undefined')
        this.state.purchaseOrder = __purchase_order;
      else
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

    return (!this.state.purchaseOrder ? "Loading..." : this.asDetailed());
  }
}
