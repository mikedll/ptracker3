process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path');
const environment = require('./environment');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Disable source maps, in case you want to debug raw webpack output
// in the browser.
// environment.config.devtool = null;

environment.plugins.prepend('CleanWebpackPlugin', new CleanWebpackPlugin(['public/packs'], {root: path.resolve(__dirname, '../../')}));
  
// console.log(environment.toWebpackConfig());

module.exports = environment.toWebpackConfig();
