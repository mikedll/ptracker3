import React from 'react';
import update from 'immutability-helper';
import _ from 'underscore';
import Loader from './loader';

export default class Items extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      queryResult: null,
      selected_item_id: null
    };

    this.state.queryResult = new RecordsHelper(true).getBootstrapped();
    if(this.state.queryResult && this.queryResult.results.length > 0) this.state.selected_item_id = this.queryResult.results[0].id;
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState(update(this.state, {[name]: {$set: value}}));
  }
  
  currentPrice() {
    if(!this.state.queryResult || !this.state.selected_item_id) return null;
    const item = _.find(this.state.queryResult.results, (item) => item.id == this.state.selected_item_id);
    return item.unit_price;
  }

  render() {
    var gPage = parseInt(getUrlParameter('page'));
    if(gPage == null || isNaN(gPage)) gPage = 1;
    if(!this.state.items) {
      $.ajax({
        url: AppRoutes.items,
        data: { page: gPage },
        dataType: 'JSON',
        success: (data) => this.setState({queryResult: data})
      });
    }

    const itemsList = (this.state.queryResult) ? (      
      <form>
        <div className="row">
          <div className="col">
            <select name="selected_item_id" className="custom-select form-control" size="20" onChange={this.handleChange}>
              {this.state.queryResult.results.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </div>
          <div className="col">
            Price: {amountFormat(this.currentPrice())}
          </div>
        </div>
      </form>
    ) : <Loader/>;
    
    return (
      <div>
        <h1>Item Catalogue</h1>
        <div>
          {itemsList}
        </div>
      </div>
    );
  }
}
