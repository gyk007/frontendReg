var path = require('path')
var webpack = require('webpack')
var MinifyPlugin = require("babel-minify-webpack-plugin")

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, './build'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: {
        loaders: [
          {sass: 'vue-style-loader!css-loader!sass?indentedSyntax'},
          {test: /jquery-mousewheel/, loader: "imports?define=>false&this=>window"},
          {test: /malihu-custom-scrollbar-plugin/, loader: "imports?define=>false&this=>window"}
        ]
      }
    })
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new MinifyPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ])
}
