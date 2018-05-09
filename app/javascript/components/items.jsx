import React from 'react';
import update from 'immutability-helper';
import _ from 'underscore';
import Loader from './loader';
import Paginator from './paginator';
import { RecordsHelper } from 'support/recordsHelper';
import { AppRoutes } from 'support/appRoutes';
import { amountFormat } from 'support/utils';

export default class Items extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      queryResult: null,
      selected_item_id: null
    };

    
    this.recordsHelper = new RecordsHelper(true, this.props);
    this.state.queryResult = this.recordsHelper.getBootstrapped();
    if(this.state.queryResult && this.state.queryResult.results.length > 0) this.state.selected_item_id = this.state.queryResult.results[0].id;
    
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
    if(this.recordsHelper.needsFetch(this.state.queryResult)) {
      this.recordsHelper.fetchPage(AppRoutes.items, (data) => this.setState({queryResult: data, selected_item_id: null}));
    }
    
    const page = this.recordsHelper.pageFromQuery();

    const itemsList = (this.state.loading || !this.state.queryResult) ? <Loader/> : (
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
    );
    
    return (
      <div>
        <h1>Item Catalogue</h1>
        {itemsList}
        <Paginator {...(this.state.queryResult ? this.state.queryResult.info : {})} page={page} path={AppRoutes.items}/>
      </div>
    );
  }
}
