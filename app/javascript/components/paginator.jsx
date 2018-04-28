import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'underscore';

class Paginator extends React.Component {

  item(el) {
    return (
      <li className="page-item">{el}</li>
    );
  }

  item(key, text, page, active) {
    return (
      <li key={'page-' + key} className={'page-item' + (active ? ' active' : '')}>
        <Link className="page-link" to={this.props.path + '?page=' + (page)}>{text}</Link>
      </li>
    );
  }
  
  render() {
    const pages = Math.ceil(this.props.total / this.props.per_page);

    const prev = (this.props.page > 1) ? this.item('prev', '‹ Prev', this.props.page-1) : null;
    const next = (this.props.page < pages) ? this.item('next', 'Next ›', this.props.page+1) : null;
    const first = (pages > 1 && this.props.page > 1) ? this.item('first', '« First', 1) : null;
    const last = (pages > 1 && this.props.page < pages) ? this.item('last', 'Last »', pages) : null;

    const middle = _.times(pages, (i) => i+1).map((page) => {
      return this.item(page, page, page, page == this.props.page);
    });

    return (
      <div className="container">
        <nav>
          <ul className="pagination">
            {[...[first, prev], ...middle, ...[next, last]]}
          </ul>
        </nav>
      </div>
    );
  }
}

Paginator.defaultProps = {
  total: 1,
  per_page: 10,
  pages: 1,
  page: 1
};

export default Paginator;
