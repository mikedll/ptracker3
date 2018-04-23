import React from 'react';
import update from 'immutability-helper';
import _ from 'underscore';

export default class Items extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item_id: this.props.data.length == 0 ? null : this.props.data[0].id
    };
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
    if(!this.state.item_id) return null;
    const item = _.find(this.props.data, (item) => item.id == this.state.item_id);
    return item.unit_price;
  }

  currentName() {
  }
  
  render() {
    const options = this.props.data.map((item) => <option key={item.id} value={item.id}>{item.name}</option>);
    
    return (
      <div>
        <form>
          <div className="row">
            <div className="col">
              <select name="item_id" className="custom-select form-control" size="20" onChange={this.handleChange}>
                {options}
              </select>
            </div>
            <div className="col">
              Price: {amountFormat(this.currentPrice())}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
