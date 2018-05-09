
import React from 'react';
import {
  BrowserRouter,
  StaticRouter,
  Route,
  Link
} from 'react-router-dom';

import { RecordsHelper } from 'support/recordsHelper';
import Loadable from 'react-loadable';
import { AppRoutes } from 'support/appRoutes';
import _ from 'underscore';
import Loader from './loader';


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
  loader: () => import('./purchase_orders'),
  loading: Loader
});


const LPurchaseOrder = Loadable({
  loader: () => import('./purchase_order'),
  loading: Loader
});

const LItems = Loadable({
  loader: () => import('./items'),
  loading: Loader
});

class AppRoot extends React.Component {

  constructor(props) {
    super(props);
    this.recordsHelper = new RecordsHelper(_.pick(this.props, 'query_result', 'record'));
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
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Route path={AppRoutes.root} exact children={() => (
              <Link className="navbar-brand" to={AppRoutes.root}>Home</Link>
            )}/>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <MenuLink to={AppRoutes.purchaseOrders} label='Purchase Orders'/>
                <MenuLink to={AppRoutes.items} label='Items'/>
              </ul>
            </div>
          </nav>
          <PropsRoute exact path="/" component={LPurchaseOrders} recordsHelper={this.recordsHelper}/>
          <PropsRoute exact path="/welcome" component={LPurchaseOrders} recordsHelper={this.recordsHelper}/>
          <PropsRoute exact path="/purchase_orders" component={LPurchaseOrders} recordsHelper={this.recordsHelper}/>        
          <PropsRoute exact path="/purchase_orders/:id" component={LPurchaseOrder} recordsHelper={this.recordsHelper}/>
          <PropsRoute exact path="/items" component={LItems} recordsHelper={this.recordsHelper}/>
       
        </div>
      </Router>
    );
  }
}

export default AppRoot;
