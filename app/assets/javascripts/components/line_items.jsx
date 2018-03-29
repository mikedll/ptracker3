class LineItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line_items: this.props.data
    };

    this.addLineItem = this.addLineItem.bind(this);
  }
  
  addLineItem(line_item) {
    var line_items = this.state.line_items;
    line_items.push(line_item);
    this.setState({line_items: line_items});
  }
  
  credits() {
    var credits = this.state.line_items.filter(function(val) { return val.amount > 0; });
    return credits.reduce(function(prev, cur) { return prev + parseFloat(cur.amount); }, 0);
  }

  debits() {
    var credits = this.state.line_items.filter(function(val) { return val.amount < 0; });
    return credits.reduce(function(prev, cur) { return prev + parseFloat(cur.amount); }, 0);
  }

  balance() {
    return this.debits() + this.credits();
  }

  render() {
    return (
      <div className="line_items">
        <h2 className="title"> Line Items </h2>
        <div className="row">
          {React.createElement(AmountBox, {type: 'success', amount: this.credits(), text: "Credit"})}
          {React.createElement(AmountBox, {type: 'danger', amount: this.debits(), text: "Debit"})}
          {React.createElement(AmountBox, {type: 'info', amount: this.balance(), text: "Balance"})}
        </div>
        {React.createElement(LineItemForm, {handleNewRecord: this.addLineItem})}
        <hr/>
        <table className="table table-bordered">
          <thead>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
          </thead>
          <tbody>
            {this.state.line_items.map(function(li){return React.createElement(LineItem, {key: li.id, line_item: li});})}
          </tbody>
        </table>
      </div>
    );
  }
}

LineItems.defaultProps = {
  line_items: []
};
