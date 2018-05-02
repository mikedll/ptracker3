
import React from 'react';
import {
  BrowserRouter,
  StaticRouter,
  Route,
  Link
} from 'react-router-dom';

import Items from './items';
import PurchaseOrders from './purchase_orders';
import PurchaseOrder from './purchase_order';
import { AppRoutes } from 'support/appRoutes';
import _ from 'underscore';

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

class AppRoot extends React.Component {
  
  render() {
    const bootstrapProps = _.pick(this.props, 'query_result', 'record');
    
    const MenuLink = ({ label, to, activeOnlyWhenExact}) => (
      <Route path={to} exact={activeOnlyWhenExact} children={({ match}) => (
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
          <PropsRoute exact path="/" component={PurchaseOrders} {...bootstrapProps}/>
          <PropsRoute exact path="/welcome" component={PurchaseOrders} {...bootstrapProps}/>
          <PropsRoute exact path="/purchase_orders" component={PurchaseOrders} {...bootstrapProps}/>
          <PropsRoute exact path="/purchase_orders/:id" component={PurchaseOrder} {...bootstrapProps}/>
          <PropsRoute exact path="/items" component={Items} {...bootstrapProps}/>
        </div>
      </Router>
    );
  }
}

export default AppRoot;
