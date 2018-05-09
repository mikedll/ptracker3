process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path');
const environment = require('./environment');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// environment.config.devtool = null;
// Disable source maps, in case you want to debug raw webpack output
// in the browser.

environment.plugins.prepend('CleanWebpackPlugin', new CleanWebpackPlugin(['public/packs'], {root: path.resolve(__dirname, '../../')}));

// See environment on bin/webpack invocation.
// console.log(environment);
// console.log(environment.toWebpackConfig());

module.exports = environment.toWebpackConfig();
