var LineItems = createReactClass({
  addLineItem: function(line_item) {
    var line_items = this.state.line_items;
    line_items.push(line_item);
    this.setState({line_items: line_items});
  },
  getInitialState: function() {
    return {
      line_items: this.props.data
    };
  },
  getDefaultProps: function() {
    return { line_items: [] };
  },
  render: function() {
    return (
      <div className="line_items">
        <h2 className="title"> Line Items </h2>
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
});
