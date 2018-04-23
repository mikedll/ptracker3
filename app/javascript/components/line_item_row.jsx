import React from 'react';
import update from 'immutability-helper';
import _ from 'underscore';
import moment from 'moment';

export default class LineItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState((prevState, props) => {
      var newState = {edit: !prevState.edit};
      this.props.handleModeChange(this.props.line_item, newState.edit);
      
      if (newState.edit && !prevState.quantity) newState['quantity'] = props.line_item.quantity;

      return newState;
    });
  }

  handleChange(e) {
    const target = e.target;
    var value = target.value;
    const name = target.name;
    this.setState(update(this.state, {[name]: {$set: value}}));
  }
  
  handleDelete(e) {
    e.preventDefault();    
    var $this = this;
    $.ajax(Object.assign(this.defaultAjax(), {
      method: 'DELETE',
      success: function(data) {
        return $this.props.handleDeleteLineItem($this.props.line_item, data);
      }
    }));
  }

  handleEdit(e) {
    e.preventDefault();    
    var $this = this;
    var params = Object.assign(this.defaultAjax(), {
      method: 'PUT',
      data: {line_item: _.pick(this.state, 'item_id', 'added_at', 'quantity')},
      success: function(data) {
        $this.setState({edit: false});
        $this.props.handleUpdateLineItem($this.props.line_item, data);
      }
    });
    $.ajax(params);
  }

  defaultAjax() {
    return {
      url: AppRoutes.lineItem(this.props.purchase_order.id, this.props.line_item.id),
      dataType: 'JSON'
    };
  }

  price() {
    var li = new LineItem(this.props.line_item.item, this.state.quantity);
    return li.price();
  }
  
  line_item_row() {
    return (
      <tr>
        <td>{moment(this.props.line_item.added_at).format(MomentFormats.Time)}</td>
        <td>{this.props.line_item.item.name}</td>
        <td>{this.props.line_item.quantity}</td>
        <td>{amountFormat(this.props.line_item.price)}</td>
        <td>
          <a className="btn btn-secondary" onClick={this.handleToggle}>Edit</a>
          <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    );
  }

  line_item_form() {
    return (
      <tr>
        <td><input className="form-control" type="text" name="added_at" defaultValue={this.props.line_item.added_at} onChange={this.handleChange}/></td>
        <td><input className="form-control" type="text" name="item_id" defaultValue={this.props.line_item.item_id} onChange={this.handleChange}/></td>
        <td><input className="form-control" type="text" name="quantity" defaultValue={this.props.line_item.quantity} onChange={this.handleChange}/></td>
        <td>{this.price()}</td>
        <td>
          <a className="btn btn-secondary" onClick={this.handleEdit}>Edit</a>
          <a className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    );
  }
  
  render() {
    return this.state.edit ? this.line_item_form() : this.line_item_row();
  }
};
