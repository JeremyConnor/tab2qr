const {
  override,
  overrideDevServer,
  addWebpackPlugin,
} = require("customize-cra");
const CopyPlugin = require("copy-webpack-plugin");

const multipleEntry = require("react-app-rewire-multiple-entry")([
  {
    entry: "src/index.js",
    template: "public/index.html",
    outPath: "/popup.html",
  },
  {
    entry: "src/export.js",
    template: "public/index.html",
    outPath: "/export.html",
  },
]);

const devServerConfig = () => (config) => {
  return {
    ...config,
    writeToDisk: true,
  };
};

const copyPlugin = new CopyPlugin({
  patterns: [{ from: "public", to: "" }],
});

module.exports = {
  webpack: override(addWebpackPlugin(copyPlugin), multipleEntry.addMultiEntry),
  devServer: overrideDevServer(devServerConfig()),
};
