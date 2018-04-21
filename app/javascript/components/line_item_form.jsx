import React from 'react';
import update from 'immutability-helper';

export default class LineItemForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: null,
      item_id: '',
      added_at: '',
      quantity: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  price () {
    if (!this.state.item || !this.state.quantity) return null;
    return parseFloat(this.state.quantity) * this.state.item.unit_price;
  }

  render() {
    return (
      <form className="form-inline new-line-item-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Item" name="item_search"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Date" value={this.state.added_at} name="added_at" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Quantity" value={this.state.quantity} name="quantity" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <strong>{this.price()}</strong>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create line item</button>
      </form>
    );
  }
  componentDidMount() {
    var $this = this;
    $('.new-line-item-form input[name=item_search]').autocomplete({
      source: AppRoutes.itemsAutocomplete,
      minLength: 2,
      select: function(event, ui) {
        event.preventDefault();
        event.target.value = ui.item.value.name;
        $this.setState({item: ui.item.value, item_id: ui.item.value.id});
      }
    });
  }
  handleChange(e) {
    const target = e.target;
    var value = target.value;
    const name = target.name;
    this.setState((prevState) =>
                  update(prevState, {[name]: {$set: value}})
                 );
  }
  valid() {
    return this.state.item_id && this.state.added_at && this.state.quantity && !isNaN(parseFloat(this.state.quantity));
  }
  handleSubmit(e) {
    var $this = this;
    e.preventDefault();
    $.post(AppRoutes.lineItems(this.props.purchaseOrderId), { line_item: this.state }, function(data) {
      $this.props.handleNewRecord(data);
      $this.setState({
        title: '',
        date: '',
        amount: ''
      });
      }, 'JSON');
  }
}
