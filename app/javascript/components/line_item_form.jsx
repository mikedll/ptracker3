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

    this.el = null;
    this.$el = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  price () {
    var li = new LineItem(this.state.item, this.state.quantity);
    return li.price();
  }

  componentDidMount() {
    var $this = this;
    this.$el = $(this.el);
    this.$el.find('input[name=item_search]').autocomplete({
      source: AppRoutes.itemsAutocomplete,
      minLength: 2,
      select: function(event, ui) {
        event.preventDefault();
        event.target.value = ui.item.value.name;
        $this.setState({item: ui.item.value, item_id: ui.item.value.id});
      }
    });
  }
  
  componentWillUnmount() {
    this.$el.find('input[name=item_search]').autocomplete('destroy');
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
        item: null,
        item_id: '',
        added_at: '',
        quantity: ''
      });
      }, 'JSON');
  }
  render() {
    return (
      <form ref={el => this.el = el} className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group mb-2 mr-sm-2">
          <input type="text" className="form-control" placeholder="Date" value={this.state.added_at} name="added_at" onChange={this.handleChange}/>
        </div>
        <div className="form-group mb-2 mr-sm-2">
          <input type="text" className="form-control" placeholder="Item" name="item_search"/>
        </div>
        <div className="form-group mb-2 mr-sm-2">
          <input type="text" className="form-control" placeholder="Quantity" value={this.state.quantity} name="quantity" onChange={this.handleChange}/>
        </div>
        <div className="form-group mb-2 mr-sm-2">
          <strong>{this.price()}</strong>
        </div>
        <button type="submit" className="btn btn-primary mb-2" disabled={!this.valid()}>Create line item</button>
      </form>
    );
  }
  
}
