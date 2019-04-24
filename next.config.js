const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass')
const webpack = require('webpack');

module.exports = withCSS(withSass({
  webpack: config => {
    const env = { API_KEY: JSON.stringify(process.env.SHOPIFY_API_KEY) };

    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  }
}));