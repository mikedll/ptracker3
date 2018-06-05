
import React from 'react';
import { Helmet } from 'react-helmet';
import { AppRoutes } from 'support/appRoutes';

export default class NewPurchaseOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      customer: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var $this = this;
    this.$el = $(this.el);
    this.$el.find('input[name=customer]').autocomplete({
      source: AppRoutes.customersAutocomplete,
      minLength: 2,
      select: function(event, ui) {
        event.preventDefault();
        event.target.value = ui.item.value.name;
        $this.setState({ customer: ui.item.value });
      }
    });
  }
  
  componentWillUnmount() {
    this.$el.find('input[name=customer]').autocomplete('destroy');
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
      <div ref={el => this.el = el}>
        <Helmet>
          <title>Create New Purchase Order</title>
        </Helmet>
        <h1>Create New Purchase Order</h1>
        <form className="form-row" onSubmit={this.handleSubmit}>
          <div className="col-auto">
            <input type="text" name="title" className="form-control" placeholder="Title" value={this.state.title} onChange={this.handleChange}/>
          </div>
          <div className="col-auto">
            <input type="text" name="customer" className="form-control" placeholder="Customer" onChange={this.handleChange}/>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" type="submit">Create</button>
          </div>
        </form>
      </div>
    );
  }
}
