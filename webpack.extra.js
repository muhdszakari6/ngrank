const webpack = require("webpack");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, `./.env.${process.env.ENVIRONMENT}`),
});

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin([
      // Insert the keys to your environment variables here.
      "TOKEN",
    ]),
  ],
};
