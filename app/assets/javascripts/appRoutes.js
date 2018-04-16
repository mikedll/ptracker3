
var AppRoutes = {
  root: '/',
  purchaseOrders: '/purchase_orders',
  lineItems: function(po_id) {
    return '/purchase_orders/' + po_id + '/line_items';
  },
  lineItem: function(po_id, li_id) {
    return '/purchase_orders/' + po_id + '/line_items/' + li_id;
  }
};
