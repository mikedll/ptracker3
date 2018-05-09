
export default function render() {
  
  var request_path = "/about"; // From window.location on client side,
                               // or set by server side code during
                               // request processing. This makes the
                               // appRoot component reusable.

  var component = null;
  if(request_path == '/about') {
    component = import(/* webpackChunkName: "about" */ './about.js');
  }
  else if(request_path == '/careers') {
    component = import(/* webpackChunkName: "careers" */ './careers.js');
  }
  else if(request_path == '/products') {
    component = import(/* webpackChunkName: "products" */ './products.js');
  }

  component.then(m => m.default());
}

