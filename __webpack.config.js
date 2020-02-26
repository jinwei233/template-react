const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const fg = require('fast-glob');

const isDevelopment = process.env.NODE_ENV === 'development';

const entries = fg.sync('src/pages/*/app.jsx');
const entry = {};

entries.forEach((item) => {
  let dir = path.dirname(item);
  dir = dir.split(path.sep);
  dir.shift();
  dir = dir.join(path.sep);
  entry[`${dir}/index`] = `./${item}`;
});

const plugins = [];
plugins.push(new MiniCssExtractPlugin({
  filename: isDevelopment ? '[name].css' : '[name].[hash].css',
  chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
}));

entries.forEach((item) => {
  const dir = path.dirname(item).split(path.sep);
  const name = dir.pop();
  plugins.push(new HtmlWebPackPlugin({
    template: './template.html',
    filename: `./${name}.html`,
  }));
});

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isDevelopment ? '[name].js' : '[name]_[contenthash].js',
    // chunkFilename: isDevelopment ? '[id].js' : '[id].[hash].js',
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    mainFields: ['module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:4]',
                context: path.resolve(__dirname, 'src/pages'),
              },
              sourceMap: isDevelopment,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude(modulePath) {
          if (modulePath.indexOf('@ali') > -1) {
            return false;
          }
          return /node_modules/.test(modulePath);
        },
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins,
};
