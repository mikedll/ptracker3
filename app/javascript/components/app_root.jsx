
import React from 'react';
import {
  BrowserRouter,
  StaticRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import { RecordsHelper } from 'support/recordsHelper';
import Loadable from 'react-loadable';
import { AppRoutes } from 'support/appRoutes';
import _ from 'underscore';
import Loader from './loader';
import moment from 'moment';

class Router extends React.Component {
  renderRouter = () => {
    if(typeof window !== 'undefined') {
      return(
        <BrowserRouter>
          {this.props.children}
        </BrowserRouter>
      );
    } else {
      return(
        <StaticRouter location={this.props.path} context={{}}>
          {this.props.children}
        </StaticRouter>
      );
    }
  }

  render() {
    return(this.renderRouter());
  }  
}

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (React.createElement(component, finalProps));
};

const PropsRoute = ({ component, ...rest }) => {
  return <Route {...rest} render={routeProps => { return renderMergedProps(component, routeProps, rest); }}/>;
};

const LPurchaseOrders = Loadable({
  loader: () => import(/* webpackChunkName: "purchase_orders" */'./purchase_orders'),
  loading: Loader
});


const LPurchaseOrder = Loadable({
  loader: () => import(/* webpackChunkName: "purchase_order" */'./purchase_order'),
  loading: Loader
});

const LItems = Loadable({
  loader: () => import(/* webpackChunkName: "items" */'./items'),
  loading: Loader
});

const LCustomers = Loadable({
  loader: () => import(/* webpackChunkName: "customers" */'./customers'),
  loading: Loader
});

const LCustomer = Loadable({
  loader: () => import(/* webpackChunkName: "customer" */'./customer'),
  loading: Loader
});

const LNewPurchaseOrder = Loadable({
  loader: () => import(/* webpackChunkName: "new_purchase_order" */ './new_purchase_order'),
  loading: Loader
});

class AppRoot extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      session_info: props.session_info
    };
    
    this.recordsHelper = new RecordsHelper(_.pick(this.props, 'query_result', 'record'));
  }
  
  componentDidMount() {
    const browserOffset = moment().format("Z");
    if(!this.state.session_info || !this.state.session_info.tzinfo || this.state.session_info.tzoffset !== browserOffset) {
      $.ajax({url: AppRoutes.session,
              method: 'PUT',
              data: {
                offset: browserOffset
              },
              success: (data) => this.setState({tzinfo: data.tzinfo})
             });
    }
  }
  
  render() {
    
    const MenuLink = ({ label, to }) => (
      <Route path={to} exact children={({ match }) => (
        <li className={'nav-item' + (match ? ' active' : '')}>
          <Link className="nav-link" to={to}>{label}</Link>
        </li>
      )}/>
    );

    return (
      <Router path={this.props.path}>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Route path={AppRoutes.root} exact children={() => (
              <Link className="navbar-brand" to={AppRoutes.root}>Home</Link>
            )}/>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className='nav-link dropdown-toggle' href='#' role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Purchase Orders
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Route exact path={AppRoutes.purchaseOrders} children={({ match }) => (
                      <Link className={'dropdown-item' + (match ? ' active' : '')} to={AppRoutes.purchaseOrders}>List All</Link>
                    )}/>
                    <Route exact path={AppRoutes.newPurchaseOrder} children={({ match }) => (
                      <Link className={'dropdown-item' + (match ? ' active' : '')} to={AppRoutes.newPurchaseOrder}>Create New</Link>
                    )}/>                    
                  </div>
                </li>
                <MenuLink to={AppRoutes.items} label='Items'/>
                <MenuLink to={AppRoutes.customers} label='Customers'/>
              </ul>
            </div>
          </nav>
          <div className="container-fluid">
            <Switch>
              <PropsRoute exact path="/" component={LPurchaseOrders} recordsHelper={this.recordsHelper}/>
              <PropsRoute exact path="/purchase_orders/new" flash_error={this.props.flash_error} component={LNewPurchaseOrder}/>
              <PropsRoute exact path="/purchase_orders" component={LPurchaseOrders} recordsHelper={this.recordsHelper}/>
              <PropsRoute exact path="/customers" component={LCustomers} recordsHelper={this.recordsHelper}/>
              <PropsRoute exact path="/customers/:id" component={LCustomer} recordsHelper={this.recordsHelper}/>
              <PropsRoute exact path="/purchase_orders/:id" component={LPurchaseOrder} recordsHelper={this.recordsHelper}/>
              <PropsRoute exact path="/items" component={LItems} recordsHelper={this.recordsHelper}/>
            </Switch>
          </div>       
        </div>
      </Router>
    );
  }
}

export default AppRoot;
