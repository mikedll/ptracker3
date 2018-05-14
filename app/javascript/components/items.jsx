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
      selected_item_id: null,
      selectedItemUnitPrice: null,
      editingItem: false
    };

    
    this.state.queryResult = this.props.recordsHelper.consumePluralBootstrap();
    if(this.state.queryResult && this.state.queryResult.results.length > 0) this.state.selected_item_id = this.state.queryResult.results[0].id;

    this.editItem = this.editItem.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState(prevState => update(prevState, {[name]: {$set: value}}));
  }

  editItem() {
    $.ajax({method: 'PUT',
            url: AppRoutes.item(this.state.selected_item_id),
            dataType: 'JSON',
            data: {
              item: {
                unit_price: this.state.selectedItemUnitPrice
              }
            },
            success: (data) => {
              const item = _.find(this.state.queryResult.results, (item) => item.id == data.id);
              const index = this.state.queryResult.results.indexOf(item);
              this.setState(prevState => {
                var nextState = update(prevState, {
                  queryResult: {results: {$splice: [[index, 1, data]]}},
                  editingItem: {$set: false}
                });
                return nextState;                
              });
            }
           });
  }
  
  toggleEdit(e) {
    if(e) e.preventDefault();
    this.setState(prevState => {
      if(!prevState.selected_item_id) {
        return {editingItem: false};
      }

      var nextState = {editingItem: !prevState.editingItem};
      if(nextState.editingItem) {
        const item = _.find(this.state.queryResult.results, (item) => item.id == prevState.selected_item_id);
        nextState.selectedItemUnitPrice = item.unit_price;
      }
      return nextState;
    });
  }
  
  handleKeyPress(e) {
    if(e.key == 'Enter') {
      e.preventDefault();
      this.editItem();
    }
    else if(e.key == 'Escape') {
      e.preventDefault();
      this.toggleEdit();
    }    
  }
  
  currentPrice() {
    if(!this.state.queryResult || !this.state.selected_item_id) return null;
    const item = _.find(this.state.queryResult.results, (item) => item.id == this.state.selected_item_id);
    return item.unit_price;
  }

  render() {
    if(this.props.recordsHelper.needsFetch(this.state.queryResult)) {
      this.props.recordsHelper.fetchPage(AppRoutes.items, (data) => this.setState({queryResult: data, selected_item_id: null}));
    }
    
    const page = this.props.recordsHelper.pageFromQuery();

    const itemView = !this.state.editingItem ?
      (
        <div className="col">
          <span className="mr-2">
            Price: {amountFormat(this.currentPrice())}
          </span>
          <button onClick={this.toggleEdit}>Edit</button>
        </div>
      ) :
      (
        <div className="col">
          <input className="mb2 mr-sm-2" name="selectedItemUnitPrice" value={this.state.selectedItemUnitPrice} type="text" onKeyPress={this.handleKeyPress} onChange={this.handleChange}/>
          <button onClick={this.editItem} className="btn btn-primary">Edit</button>
        </div>
      );
            

    const itemsList = (this.state.loading || !this.state.queryResult) ? <Loader/> : (
      <form onSubmit={e => e.preventDefault()}>
        <div className="row">
          <div className="col">
            <select name="selected_item_id" className="custom-select form-control" size="20" onChange={this.handleChange}>
              {this.state.queryResult.results.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </div>
          {itemView}
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
