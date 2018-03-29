
class LineItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();    
    var $this = this;
    $.ajax({
      method: 'DELETE',
      url: '/line_items/' + this.props.line_item.id,
      dataType: 'JSON',
      success: function() {
        return $this.props.handleDeleteLineItem($this.props.line_item);
      }
    });
  }
  
  render() {
    return (
      <tr>
        <td>{this.props.line_item.date}</td>
        <td>{this.props.line_item.title}</td>
        <td>{amountFormat(this.props.line_item.amount)}</td>
        <td><a className="btn btn-danger" onClick={this.handleDelete}>Delete</a></td>
      </tr>
    );
  }
};
