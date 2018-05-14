module.exports = (env) => {
  return require(`./build/webpack.${env}.conf.js`);
};
