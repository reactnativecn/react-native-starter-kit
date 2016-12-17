/**
 * Created by tdzl2003 on 7/11/16.
 */

import React, { Component, PropTypes } from 'react';

export default class LinkContainer extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    pop: PropTypes.bool,
    to: PropTypes.string,
    children: PropTypes.element,
  };
  static contextTypes = {
    navigator: PropTypes.object,
  };
  onPress = () => {
    const { onPress, pop, to } = this.props;
    const { navigator } = this.context;
    if (onPress) {
      onPress();
    }
    if (pop) {
      navigator.pop();
    } else {
      navigator.push({
        location: to,
      });
    }
  };
  render() {
    const { children } = this.props;
    const child = React.Children.only(children);

    return React.cloneElement(child, {
      onPress: this.onPress,
    });
  }
}
