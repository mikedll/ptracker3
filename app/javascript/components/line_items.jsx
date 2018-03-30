import React from 'react';
import update from 'immutability-helper';
import LineItem from './line_item';
import LineItemForm from './line_item_form';
import AmountBox from './amount_box';

export default class LineItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line_items: this.props.data
    };

    this.addLineItem = this.addLineItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(line_item) {
    var index = this.state.line_items.indexOf(line_item);
    var line_items = update(this.state.line_items, { $splice: [[index, 1]] } );
    this.setState({line_items: line_items});
  }
  
  addLineItem(line_item) {
    var line_items = update(this.state.line_items, {$push: [line_item]});
    this.setState({line_items: line_items});
  }
  
  credits() {
    var credits = this.state.line_items.filter(function(val) { return val.amount > 0; });
    return credits.reduce(function(prev, cur) { return prev + parseFloat(cur.amount); }, 0);
  }

  debits() {
    var credits = this.state.line_items.filter(function(val) { return val.amount < 0; });
    return credits.reduce(function(prev, cur) { return prev + parseFloat(cur.amount); }, 0);
  }

  balance() {
    return this.debits() + this.credits();
  }

  render() {
    var $this = this; 
    var lineItems = this.state.line_items.map(function(li){ return React.createElement(LineItem, {key: li.id, line_item: li, handleDeleteLineItem: $this.handleDelete});});
    
    return (
      <div className="line_items">
        <h2 className="title"> Line Items </h2>
        <div className="row">
          {React.createElement(AmountBox, {type: 'success', amount: this.credits(), text: "Credit"})}
          {React.createElement(AmountBox, {type: 'danger', amount: this.debits(), text: "Debit"})}
          {React.createElement(AmountBox, {type: 'info', amount: this.balance(), text: "Balance"})}
        </div>
        {React.createElement(LineItemForm, {handleNewRecord: this.addLineItem})}
        <hr/>
        <table className="table table-bordered">
          <thead>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {lineItems}
          </tbody>
        </table>
      </div>
    );
  }
}

LineItems.defaultProps = {
  line_items: []
};
