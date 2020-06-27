//const path = require("path");

/*module.exports = {
  entry: { index: path.resolve(__dirname, "source", "index.js") }
};
//const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "build")
  }
};
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const path = require("path");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    })
  ]
};*/

//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const path = require("path");

/*module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    })
  ]
};

//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    })
  ]
};*/

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  module: {
    rules: [
	
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
	  {
                test: /\.ts$/,
				 exclude: /node_modules/,
                use: ["ts-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
   resolve: {
         extensions: [".tsx", ".ts", ".js"]
    },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    })
  ]
};

/*module.exports = {
  module: {
  // omitted for brevity
  },
  optimization: {
    splitChunks: { chunks: "all" }
  },
  // omitted for brevity
};*/