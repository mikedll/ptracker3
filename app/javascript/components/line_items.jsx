import React from 'react';
import update from 'immutability-helper';
import LineItemRow from './line_item_row';
import LineItemForm from './line_item_form';
import _ from 'underscore';
import { amountFormat } from 'support/utils';

export default class LineItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line_items: this.props.data,
      purchase_order: this.props.purchase_order,
      lineItemsInEditMode: []
    };

    this.addLineItem = this.addLineItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }

  handleDelete(line_item, data) {
    this.setState(function(prevState) {
      var index = prevState.line_items.indexOf(line_item);
      var line_items = update(prevState.line_items, { $splice: [[index, 1]] } );
      return {line_items: line_items, purchase_order: data};
    });
  }

  /*
   * Updates line item data here, and removes
   * the editing flag for that line item.
   */
  handleUpdate(lineItem, data) {
    this.setState((prevState) => {
      const index = prevState.line_items.indexOf(lineItem);
      const line_items = update(prevState.line_items, {$splice: [[index, 1, _.omit(data, 'purchase_order')]]});
      return {
        line_items: line_items,
        purchase_order: data.purchase_order,
        lineItemsInEditMode: this.stateWithoutEditFlag(prevState, lineItem)};
    });
  }

  stateWithoutEditFlag(prevState, lineItem) {
    let l = update(prevState.lineItemsInEditMode, {$splice: [[prevState.lineItemsInEditMode.indexOf(lineItem.id), 1]]});
    return l;
  }
  
  handleModeChange(lineItem, isEditing) {
    if(isEditing)
      this.setState(prevState => {
        return { lineItemsInEditMode: update(prevState.lineItemsInEditMode, {$push: [lineItem.id]}) };
      });
    else
      this.setState(prevState => {
        return { lineItemsInEditMode: this.stateWithoutEditFlag(prevState, lineItem) };
      });
  }
  
  addLineItem(line_item) {
    this.setState(function(prevState) {
      var line_items = update(prevState.line_items, {$push: [_.omit(line_item, 'purchase_order')]});
      return {line_items: line_items, purchase_order: line_item.purchase_order};
    });
  }
  
  total() {
    return (this.state.lineItemsInEditMode.length == 0) ? this.state.purchase_order.total : null;
  }

  render() {
    var $this = this; 
    var lineItems = this.state.line_items.map(function(li) {
      return <LineItemRow key={li.id} purchase_order={$this.state.purchase_order} line_item={li} handleDeleteLineItem={$this.handleDelete} handleUpdateLineItem={$this.handleUpdate} handleModeChange={$this.handleModeChange}/>;
    });
    
    return (
      <div className="line_items">
        <div><strong> Line Items </strong></div>
        <LineItemForm handleNewRecord={this.addLineItem} purchaseOrderId={this.state.purchase_order.id}/>
        <hr/>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date Added</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lineItems}
            <tr className="total-line">
              <td colSpan="2"></td>
              <td className="total-label">Total:</td>              
              <td className="total">{amountFormat(this.total())}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
