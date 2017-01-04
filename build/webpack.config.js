module.exports = {
  vendorName: 'vendor',
  devPort: 8082,
  appEntries: './modules/**/index.js',
  htmlWebpackOptions: {
    hash: 6,
    minify: false
  }
};
