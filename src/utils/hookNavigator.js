/**
 * Created by tdzl2003 on 12/18/16.
 */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign  */

import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  baseScene: {
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCENE_DISABLED_NATIVE_PROPS = {
  pointerEvents: 'none',
  style: {
    top: SCREEN_HEIGHT,
    bottom: -SCREEN_HEIGHT,
    opacity: 0,
  },
};

// Hook navigator method
function hookedDisableScene(sceneIndex) {
  const sceneConstructor = this._sceneRefs[sceneIndex];
  // const nextRoute = this.state.routeStack[sceneIndex + 1];
  const nextSceneConfig = this.state.sceneConfigStack[sceneIndex + 1];

  if (nextSceneConfig && nextSceneConfig.isModal) {
    sceneConstructor.setNativeProps({
      pointerEvents: 'none',
    });
  } else {
    sceneConstructor.setNativeProps(SCENE_DISABLED_NATIVE_PROPS);
  }
}

function hookedEnableScene(sceneIndex) {
  // First, determine what the defined styles are for scenes in this navigator
  const sceneStyle = StyleSheet.flatten([styles.baseScene, this.props.sceneStyle]);
  // Then restore the pointer events and top value for this scene
  const enabledSceneNativeProps = {
    pointerEvents: 'auto',
    style: {
      top: sceneStyle.top,
      bottom: sceneStyle.bottom,
    },
  };
  const nextSceneConfig = this.state.sceneConfigStack[sceneIndex + 1];

  if (sceneIndex !== this.state.transitionFromIndex &&
    sceneIndex !== this.state.presentedIndex) {
    // If we are not in a transition from this index, make sure opacity is 0
    // to prevent the enabled scene from flashing over the presented scene
    if (!nextSceneConfig || !nextSceneConfig.isModal) {
      enabledSceneNativeProps.style.opacity = 0;
    }
  }
  if (this._sceneRefs[sceneIndex]) {
    this._sceneRefs[sceneIndex].setNativeProps(enabledSceneNativeProps);
  }
}

export default function hookNavigator(navigator) {
  if (!navigator._hookedForDialog) {
    navigator._hookedForDialog = true;
    navigator._disableScene = hookedDisableScene.bind(navigator);
    navigator._enableScene = hookedEnableScene.bind(navigator);
  }
}
