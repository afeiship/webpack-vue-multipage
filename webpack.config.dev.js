(function() {

  var webpack = require('webpack');
  var fs = require('fs');
  var path = require('path');
  var glob = require('glob');

  const debug = process.env.NODE_ENV !== 'production';

  function entries (globPath) {
      var files = glob.sync(globPath);
      var entries = {}, entry, dirname, basename;

      for (var i = 0; i < files.length; i++) {
          entry = files[i];
          dirname = path.dirname(entry);
          basename = path.basename(entry, '.js');
          entries[path.join(dirname, basename)] = './' + entry;
      }

      return entries;
  }

  module.exports = {
      entry: entries('src/modules/**/*.js'),
      output: {
          path: path.join(__dirname, 'dist'),
          publicPath: '/assets/build/',
          filename: '[name]' + (debug ? '' : '-[chunkhash]') + '.js',
          chunkFilename: '[id]' + (debug ? '' : '-[chunkhash]') + '.js'
      },
      plugins: [
          function () {
              this.plugin('done', function (stats) {
                console.log(stats);
                  stats = stats.compilation.getStats().toJson({
                      hash: true,
                      publicPath: true,
                      assets: true,
                      chunks: false,
                      modules: false,
                      source: false,
                      errorDetails: false,
                      timings: false
                  });

                  var json = {}, chunk;
                  for (var key in stats.assetsByChunkName) {
                      if (stats.assetsByChunkName.hasOwnProperty(key)) {
                          chunk = stats.assetsByChunkName[key];
                          json[key + '.js'] = chunk[0];
                      }
                  }

                  fs.writeFileSync(
                      path.join(__dirname, 'dist', 'rev-manifest.json'),
                      JSON.stringify(json, null, 2)
                  );
              });
          }
      ]
  };


}());
