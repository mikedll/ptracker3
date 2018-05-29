// By default, this pack is loaded for server-side rendering.
// It must expose react_ujs as `ReactRailsUJS` and prepare a require context.

import { Helmet } from 'react-helmet';

var componentRequireContext = require.context("components", true)
var ReactRailsUJS = require("react_ujs")
ReactRailsUJS.useContext(componentRequireContext)

self.ReactHelmet = Helmet;

if(typeof(__webpack_require__.e) === "undefined") {
  __webpack_require__.e = function(unusedChunkId) {
    return new Promise(function(resolve) { resolve(); });
  };
}

