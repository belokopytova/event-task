const path = require("path");

module.exports = {
  entry: "./src/index.js", 
  output: {
    filename: "bundle.js", 
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development", 
  devServer: {
    static: "./dist", 
    port: 3000,
    open: true, 
    hot: true, 
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: "babel-loader", 
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], 
      },
    ],
  },
  resolve: {
    extensions: [".js"], 
  },
};
