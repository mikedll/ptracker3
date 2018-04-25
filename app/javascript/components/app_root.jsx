
import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import PurchaseOrders from './purchase_orders';
import PurchaseOrder from './purchase_order';

class AppRoot extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={PurchaseOrders}/>
          <Route path="/welcome" component={PurchaseOrders}/>
          <Route path="/purchase_orders/:id" component={PurchaseOrder}/>
        </div>
      </Router>
    );
  }
}

export default AppRoot;
