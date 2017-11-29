const tslib = require('tslib/tslib.es6.js');

for (const key of Object.keys(tslib)) {
  if (key !== '__esModule') {
    global[key] = tslib[key];
  }
}

require('./src');
