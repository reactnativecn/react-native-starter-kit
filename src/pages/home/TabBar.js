/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, { PropTypes, Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    height: 60,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    color: 'blue',
  },
});

export default class TabBar extends Component {
  static contextTypes = {
    navigator: PropTypes.object,
  };

  goto(location) {
    const { navigator } = this.context;
    navigator.replace({ location });
  }
  renderItem(to, label) {
    const { router } = this.props;
    const isActive = router.isActive(to);
    return (
      <TouchableOpacity style={styles.button} onPress={() => this.goto(to)}>
        <Text style={isActive && styles.active}>{label}</Text>
      </TouchableOpacity>
    );
  }
  onLeftPressed() {
    if (this.childrenRef && this.childrenRef.onLeftPressed) {
      this.childrenRef.onLeftPressed();
    }
  }
  onRightPressed() {
    if (this.childrenRef && this.childrenRef.onRightPressed) {
      this.childrenRef.onRightPressed();
    }
  }
  getRef = (ref) => {
    this.childrenRef = ref;
  };
  render() {
    const { children, router: _, ...others } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {React.cloneElement(children, { ref: this.getRef })}
        </View>
        <View style={styles.tabBar}>
          {this.renderItem('/home/home', '首页')}
          {this.renderItem('/home/shop', '商城')}
          {this.renderItem('/home/personal', '个人中心')}
        </View>
      </View>
    );
  }
}

TabBar.propTypes = {
  children: PropTypes.element,
  router: PropTypes.shape({
    isActive: PropTypes.func,
  }),
};
