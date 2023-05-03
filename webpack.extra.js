const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin([
      // Insert the keys to your environment variables here.
      "TOKEN",
    ]),
  ],
};
