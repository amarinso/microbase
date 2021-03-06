const path = require('path');
const fs = require('fs');
const conf = require('nconf');

module.exports = function (stores) {

  stores = stores || {};

  var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  var basePath = path.normalize(__dirname + '/../..');
  var rootPath = path.dirname(require.main.filename);
  if (rootPath.lastIndexOf('node_modules') != -1) {
    rootPath = rootPath.substr(0, rootPath.lastIndexOf('node_modules') - 1);
  }
  // add framework defaults
  stores.push(basePath + '/modules/config/defaults.json');

  console.log('%s - \u001b[32minfo\u001b[39m: [config] using [%s] configuration', new Date().toISOString(), env);

  conf.env('_');
  conf.argv();

  var i = 1;
  stores.forEach(function (file) {
    if (!path.isAbsolute(file)) {
      file = rootPath + '/' + file;
    }
    file = path.normalize(file);
    console.log('%s - \u001b[32minfo\u001b[39m: [config] using file [%s]', new Date().toISOString(), file);
    try {
      if (!fs.existsSync(file)) {
        throw new Error('File doesn\'t exist');
      }
      conf.use('z' + i++, { type: 'file', file: file });
    } catch (e) {
      console.log('%s - \u001b[31merror\u001b[39m: [config] file [%s] error [%s]', new Date().toISOString(), file, e.message);
    }
  });

  conf.set('env', env);
  conf.set('basePath', basePath);
  conf.set('rootPath', rootPath);

  return conf;
};