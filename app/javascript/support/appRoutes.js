
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
  items: '/items',
  itemsSearch: function(s) {
    return '/items?s=' + s;
  },
  item: function(id) { return '/items/' + id; }
};

export { AppRoutes };

