import React from 'react';
import update from 'immutability-helper';
import _ from 'underscore';

export default class LineItem extends React.Component {
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
    this.setState({edit: !this.state.edit});
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState(update(this.state, {[name]: {$set: value}}));
  }
  
  handleDelete(e) {
    e.preventDefault();    
    var $this = this;
    $.ajax(Object.assign(this.defaultAjax(), {
      method: 'DELETE',
      success: function() {
        return $this.props.handleDeleteLineItem($this.props.line_item);
      }
    }));
  }

  handleEdit(e) {
    e.preventDefault();    
    var $this = this;
    var params = Object.assign(this.defaultAjax(), {
      method: 'PUT',
      data: {line_item: _.pick(this.state, 'date', 'title', 'amount')},
      success: function(data) {
        $this.setState({edit: false});
        $this.props.handleUpdateLineItem($this.props.line_item, data);
      }
    });
    $.ajax(params);
  }

  defaultAjax() {
    return {
      url: '/line_items/' + this.props.line_item.id,
      dataType: 'JSON'
    };
  }

  line_item_row() {
    return (
      <tr>
        <td>{this.props.line_item.date}</td>
        <td>{this.props.line_item.title}</td>
        <td>{amountFormat(this.props.line_item.amount)}</td>
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
        <td><input className="form-control" type="text" name="date" defaultValue={this.props.line_item.date} onChange={this.handleChange}/></td>
        <td><input className="form-control" type="text" name="title" defaultValue={this.props.line_item.title} onChange={this.handleChange}/></td>
        <td><input className="form-control" type="text" name="amount" defaultValue={this.props.line_item.amount} onChange={this.handleChange}/></td>
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
