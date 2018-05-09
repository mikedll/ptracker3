import React from 'react';
import update from 'immutability-helper';
import _ from 'underscore';
import moment from 'moment';
import { AppRoutes } from 'support/appRoutes';
import { LineItem } from 'support/line_item';
import { amountFormat, MomentFormats } from 'support/utils';

export default class LineItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      item: this.props.line_item.item,
      item_id: this.props.line_item.item.id,
      added_at: this.props.line_item.added_at,
      quantity: this.props.line_item.quantity
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  bindUIDecorators() {
    var $this = this;
    $(this.el).find('input[name=item_search]').autocomplete({
      source: AppRoutes.itemsAutocomplete,
      minLength: 2,
      select: function(event, ui) {
        event.preventDefault();
        event.target.value = ui.item.value.name;
        $this.setState({item: ui.item.value, item_id: ui.item.value.id});
      }
    });    
    $(this.el).find('input[name=added_at]').datepicker({
      onSelect: (dateText) => {
        this.setState({added_at: dateText});
      },
      dateFormat: 'yy-mm-dd'
    });
  }

  unbindUIDecorators() {
    $(this.el).find('input[name=item_search]').autocomplete('destroy');    
    $(this.el).find("input[name=added_at]").datepicker('destroy');
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(!prevState.edit && this.state.edit) this.bindUIDecorators();
  }
  
  componentWillUnmount() {
    if(this.state.edit) this.unbindUIDecorators();
  }
  
  handleToggle(e) {
    e.preventDefault();

    // This is a strange place to unbind, but componentDidUpdate is too late.
    if(this.state.edit) this.unbindUIDecorators();
    
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

  defaultAjax() {
    return {
      url: AppRoutes.lineItem(this.props.purchase_order.id, this.props.line_item.id),
      dataType: 'JSON'
    };
  }

  handleEdit() {
    var $this = this;
    $.ajax(Object.assign(this.defaultAjax(), {
      method: 'PUT',
      data: {line_item: _.pick(this.state, 'item_id', 'added_at', 'quantity')},
      success: function(data) {
        // componentDidUpdate is too late for this unbind
        $this.unbindUIDecorators();
        $this.setState(Object.assign({edit: false}, _.pick(data, 'item', 'item_id', 'added_at', 'quantity')));
        $this.props.handleUpdateLineItem($this.props.line_item, data);
      }
    }));    
  }
  
  handleEditButton(e) {
    e.preventDefault();
    this.handleEdit();
  }

  handleKeyPress(e) {
    if(e.key == 'Enter') {
      e.preventDefault();
      this.handleEdit();
    }
  }
  
  price() {
    var li = new LineItem(this.state.item, this.state.quantity);
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
      <tr ref={el => this.el = el}>
        <td><input className="form-control" type="text" name="added_at" placeholder="Date" defaultValue={this.state.added_at} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/></td>
        <td><input className="form-control" type="text" name="item_search" placeholder="Item" defaultValue={this.props.line_item.item.name} onKeyPress={this.handleKeyPress}/></td>
        <td><input className="form-control" type="text" name="quantity" placeholder="Quantity" defaultValue={this.state.quantity} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/></td>
        <td>{this.price()}</td>
        <td>
          <a className="btn btn-secondary" onClick={this.handleEditButton}>Edit</a>
          <a className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    );
  }
  
  render() {
    return this.state.edit ? this.line_item_form() : this.line_item_row();
  }
};
