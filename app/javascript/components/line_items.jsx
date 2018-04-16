import React from 'react';
import update from 'immutability-helper';
import LineItem from './line_item';
import LineItemForm from './line_item_form';
import AmountBox from './amount_box';
import _ from 'underscore';

export default class LineItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line_items: this.props.data,
      purchase_order: this.props.purchase_order
    };

    this.addLineItem = this.addLineItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleDelete(line_item, data) {
    var index = this.state.line_items.indexOf(line_item);
    var line_items = update(this.state.line_items, { $splice: [[index, 1]] } );
    this.setState({line_items: line_items, purchase_order: data});
  }

  handleUpdate(line_item, data) {
    var index = this.state.line_items.indexOf(line_item);
    var line_items = update(this.state.line_items, {$splice: [[index, 1, _.omit(data, 'purchase_order')]]});
    this.setState({line_items: line_items, purchase_order: data.purchase_order});
  }
  
  addLineItem(line_item) {
    var line_items = update(this.state.line_items, {$push: [_.omit(line_item, 'purchase_order')]});
    this.setState({line_items: line_items, purchase_order: line_item.purchase_order});
  }
  
  total() {
    return this.state.purchase_order.total;
  }

  render() {
    var $this = this; 
    var lineItems = this.state.line_items.map(function(li) {
      return <LineItem key={li.id} purchase_order={$this.state.purchase_order} line_item={li} handleDeleteLineItem={$this.handleDelete} handleUpdateLineItem={$this.handleUpdate}/>;
    });
    
    return (
      <div className="line_items">
        <h4 className="title"> Line Items </h4>
        <LineItemForm handleNewRecord={this.addLineItem} purchaseOrderId={this.state.purchase_order.id}/>
        <hr/>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lineItems}
          </tbody>
        </table>
        <div className="row">
          <div className="col-md-4"/>
          <div className="col-md-4"/>
          <AmountBox type='info' amount={this.total()} text="Total"/>
        </div>
      </div>
    );
  }
}
