import React from 'react';

export default class LineItemForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      amount: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }
  
  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Date" value={this.state.date} name="date" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Title" value={this.state.title} name="title" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Amount" value={this.state.amount} name="amount" onChange={this.handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create line item</button>
      </form>
    );
  }
  handleChange(e) {
    var name = e.target.name;
    var newVals = {};
    newVals[name] = e.target.value;
    this.setState(newVals);
  }
  valid() {
    return this.state.title && this.state.date && this.state.amount;
  }
  handleSubmit(e) {
    var $this = this;
    e.preventDefault();
    $.post('', { line_item: this.state }, function(data) {
      $this.props.handleNewRecord(data);
      $this.setState({
        title: '',
        date: '',
        amount: ''
      });
      }, 'JSON');
  }
}
