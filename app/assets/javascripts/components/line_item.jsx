
var LineItem = createReactClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.line_item.date}</td>
        <td>{this.props.line_item.title}</td>
        <td>{amountFormat(this.props.line_item.amount)}</td>
      </tr>
    );
  }
});
