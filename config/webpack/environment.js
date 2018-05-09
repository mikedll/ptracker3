const { environment } = require('@rails/webpacker')
const coffee =  require('./loaders/coffee')
const webpack = require('webpack');

environment.loaders.append('coffee', coffee);

environment.plugins.append('webpack.IgnorePlugin', new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

module.exports = environment
