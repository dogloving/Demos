const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: "development",
  optimization: {
    minimize: true
  },
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[hash].js",
    environment: {
      arrowFunction: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({template: './src/index.html'})
  ],
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: ["style-loader","css-loader",{
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                  {
                    browsers: 'last 2 version'
                  }
                ]
              ]
            }
          }
        },"less-loader"],
      },
      {
        test: /\.ts$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    "edge": "89",
                    "ie": "11"
                  },
                  "corejs": "3",
                  "useBuiltIns": "usage"
                }
              ]
            ]
          }
         },'ts-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js','.ts']
  }
}