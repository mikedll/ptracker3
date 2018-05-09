
var AppRoutes = {
  root: '/',
  itemsAutocomplete: '/items/autocomplete',
  purchaseOrders: '/purchase_orders',
  purchaseOrder: (id) => '/purchase_orders/' + id,
  lineItems: function(po_id) {
    return '/purchase_orders/' + po_id + '/line_items';
  },
  lineItem: function(po_id, li_id) {
    return '/purchase_orders/' + po_id + '/line_items/' + li_id;
  },
  items: '/items'
};

export { AppRoutes };

