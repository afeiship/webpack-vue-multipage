export default (env) => {
  return require(`./build/webpack.config.${env}.babel.js`);
};
