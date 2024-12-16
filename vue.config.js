const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
    resolve: {
      fallback: {
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        util: require.resolve('util/'),
        querystring: require.resolve('querystring-es3'),
        url: require.resolve('url/'),
        fs: false, // Backend-specific; no polyfill for the browser
        net: false, // Backend-specific; no polyfill for the browser
        tls: false, // Backend-specific; no polyfill for the browser
        dns: false, // Backend-specific; no polyfill for the browser
      },
    },
  },
};
