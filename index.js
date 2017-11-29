const tslib = require('tslib/tslib.es6.js');

for (const key of Object.keys(tslib)) {
  if (key !== '__esModule') {
    global[key] = tslib[key];
  }
}

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}

require('./src');
