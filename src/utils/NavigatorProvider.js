/**
 * Created by LzxHahaha on 2016/1/28.
 */

import React, { PropTypes } from 'react';
import {
  View,
  Navigator,
} from 'react-native';

export default class NavigatorProvider extends React.Component {
  static propTypes = {
    navigator: PropTypes.instanceOf(Navigator),
    currentRoute: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  }
  static childContextTypes = {
    navigator: PropTypes.instanceOf(Navigator),
    currentRoute: PropTypes.object,
  };

  getChildContext() {
    return {
      navigator: this.props.navigator,
      currentRoute: this.props.currentRoute,
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
      </View>
    );
  }
}
