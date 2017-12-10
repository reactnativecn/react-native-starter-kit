import I18n from 'react-native-i18n';
import translations = require('./translations');
import './utils/exceptionHandler';

import {
  AppRegistry,
} from 'react-native';
import App from './App';

I18n.fallbacks = true;
// Define your native supported language (final fallback language):
// I18n.defaultLocale = 'en';
I18n.translations = translations;

AppRegistry.registerComponent('App', () => App);
