var LineItems = createReactClass({
  getInitialState: function() {
    return {
      line_items: this.props.data
    };
  },
  getDefaultProps: function() {
    return { records: [] };
  },
  render: function() {
    return (
      <div className="line_items">
        <h2 className="title"> Line Items </h2>
      </div>
    );
  }
});
