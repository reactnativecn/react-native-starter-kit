const { reactPromiseMethod, reactModule } = require('react-native-web-platform/lib/Libraries/NativeModules/decorators');

function getLanguages(): string[] {
  if (window.navigator.languages) {
    return window.navigator.languages;
  }
  return [(window.navigator as any).userLanguage || window.navigator.language];
}

@reactModule('RNI18n')
class RNI18n {

  constants = {
    languages: getLanguages(),
  };

  @reactPromiseMethod
  async getLanguages() {
    return getLanguages();
  }
}

