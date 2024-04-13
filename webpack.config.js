const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Path to your main JavaScript file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Presets for JavaScript and React
          }
        }
      },
      {
        test: /\.css$/, // Rule for .scss files
        use: ['style-loader', 'css-loader']
      },
      // Uncomment the following rule if you are using plain CSS files.
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './my-app/public/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
