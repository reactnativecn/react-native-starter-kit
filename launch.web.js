const { Bridge } = require('react-native-web-platform/lib/launch');

const bridge = new Bridge(
  __DEV__ ?
    './index.bundle?platform=web':
    './index.bundle.js'
)


bridge.start();

bridge.createRootView(document.body, 'App');
