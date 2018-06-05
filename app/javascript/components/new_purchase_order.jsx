
import React from 'react';
import { Helmet } from 'react-helmet';

export default class NewPurchaseOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      customer: '',
      customer_id: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }
  
  handleSubmit(e) {
    e.preventDefault();
  }
  
  render() {
    return (
      <div>
        <Helmet>
          <title>Create New Purchase Order</title>
        </Helmet>
        <h1>Create New Purchase Order</h1>
        <form className="form-row" onSubmit={this.handleSubmit}>
          <div className="col-auto">
            <input type="text" name="title" className="form-control" placeholder="Title" value={this.state.title} onChange={this.handleChange}/>
          </div>
          <div className="col-auto">
            <input type="text" name="customer" className="form-control" placeholder="Customer" value={this.state.customer} onChange={this.handleChange}/>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" type="submit">Create</button>
          </div>
        </form>
      </div>
    );
  }
}
