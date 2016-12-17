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
    children: PropTypes.oneOf(
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ),
  }
  static childContextTypes = {
    navigator: PropTypes.instanceOf(Navigator),
  };

  getChildContext() {
    return {
      navigator: this.props.navigator,
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
