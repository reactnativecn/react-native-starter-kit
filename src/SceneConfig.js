/**
 * Created by tdzl2003 on 12/17/16.
 */

import {
  Navigator,
} from 'react-native';
import { match } from 'react-router';

import routeConfig from './pages';

export const DefaultSceneConfig = Navigator.SceneConfigs.PushFromRight;

export function configureScene({ sceneConfig, location, component }) {
  if (sceneConfig) {
    return sceneConfig;
  }
  if (location) {
    let matchedConfig = null;
    let debugWarn = true;
    match({
      location,
      routes: routeConfig,
    }, (err, _, passProps) => {
      if (err) {
        console.error(err.stack);
        return;
      }
      if (passProps) {
        const { routes } = passProps;
        // Find any scene config from route configs.
        matchedConfig = routes
          .map(v => v.sceneConfig || (v.component && v.component.sceneConfig))
          .find(v => v);
      }
      if (__DEV__) {
        debugWarn = false;
      }
    });

    if (__DEV__ && debugWarn) {
      console.warn('Async component is not supported in react-native, your sceneConfig may be lost.');
    }
    if (matchedConfig) {
      return matchedConfig;
    }
  } else if (component && component.sceneConfig) {
    return component.sceneConfig;
  }
  return DefaultSceneConfig;
}
