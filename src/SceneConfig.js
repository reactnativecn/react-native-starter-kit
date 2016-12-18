/**
 * Created by tdzl2003 on 12/17/16.
 */

import {
  Navigator,
} from 'react-native';
import { match } from 'react-router';
import buildStyleInterpolator from 'react-native/Libraries/Utilities/buildStyleInterpolator';

export const DefaultSceneConfig = Navigator.SceneConfigs.PushFromRight;

const FadeOutHalf = {
  opacity: {
    from: 1,
    to: 0.3,
    min: 0,
    max: 0.5,
    type: 'linear',
    extrapolate: false,
    round: 100,
  },
};

export const FadeModal = {
  ...Navigator.SceneConfigs.FadeAndroid,
  isModal: true,
  animationInterpolators: {
    ...Navigator.SceneConfigs.FadeAndroid.animationInterpolators,
    out: buildStyleInterpolator(FadeOutHalf),
  },
};

export const BottomModal = {
  ...Navigator.SceneConfigs.FloatFromBottom,
  isModal: true,
};

export function configureScene(routeConfig, { sceneConfig, location, component }) {
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
