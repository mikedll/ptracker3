
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import PurchaseOrders from './purchase_orders';
import PurchaseOrder from './purchase_order';

class AppRoot extends React.Component {

  render() {
    const MenuLink = ({ label, to, activeOnlyWhenExact}) => (
      <Route path={to} exact={activeOnlyWhenExact} children={({ match}) => (
        <li className={'nav-item' + (match ? ' active' : '')}>
          <Link className="nav-link" to={to}>{label}</Link>
        </li>
      )}/>
    );

    return (
      <Router>
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
          <Route exact path="/" component={PurchaseOrders}/>
          <Route path="/welcome" component={PurchaseOrders}/>
          <Route exact path="/purchase_orders" component={PurchaseOrders}/>
          <Route path="/purchase_orders/:id" component={PurchaseOrder}/>
        </div>
      </Router>
    );
  }
}

export default AppRoot;
