const { resolve } = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const config = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "js/[name].bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, "dist"),
    port: 3000,
    host: "localhost",
    index: "index.html",
    overlay: {
      warning: false,
      errors: true,
    },
    proxy: [
      {
        context: ["/api", "/auth", "/ws"],
        target: `http://localhost:${process.env.PORT || 8090}`,
        secure: false,
        changeOrigin: true,
        ws: process.env.ENABLE_SOCKETS || false,
      },
    ],
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loaders: ["eslint-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          { loader: "css-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg|webp)$/,
        loader: "image-webpack-loader",
        enforce: "pre",
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/main.css",
      chunkFilename: "css/[id].css",
      ignoreOrder: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/public/index.html`,
          to: "index.html",
        },
      ],
    }),
  ],
}

module.exports = config
