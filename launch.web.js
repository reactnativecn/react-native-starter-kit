const tslib = require('tslib/tslib.es6.js');

for (const key of Object.keys(tslib)) {
  if (key !== '__esModule') {
    global[key] = tslib[key];
  }
}

require('./src/web-native/i18n');
const { Bridge } = require('react-native-web-platform/lib/launch');

const bridge = new Bridge(
  __DEV__ ?
    './index.bundle?platform=web&dev=true':
    './index.bundle.js'
)


bridge.start();

bridge.createRootView(document.body, 'App');
