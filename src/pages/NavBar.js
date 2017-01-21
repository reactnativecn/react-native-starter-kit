/**
 * Created by tdzl2003 on 12/18/16.
 */
import React, { Component, PropTypes } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import backImage from './assets/back.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    height: __IOS__ ? 64 : 44,
    paddingTop: __IOS__ ? 20 : 0,
    backgroundColor: '#db2f37',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 70,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  left: {
    position: 'absolute',
    top: __IOS__ ? 20 : 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  right: {
    position: 'absolute',
    top: __IOS__ ? 20 : 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  button: {
    color: 'white',
    fontSize: 15,
  },
});

export default class NavBar extends Component {
  static contextTypes = {
    navigator: PropTypes.object,
    currentRoute: PropTypes.object,
  };
  static propTypes = {
    children: PropTypes.element,
    routes: PropTypes.arrayOf(PropTypes.object),
  };
  onLeftPressed = () => {
    if (this.childrenRef && this.childrenRef.onLeftPressed) {
      this.childrenRef.onLeftPressed();
    } else {
      this.context.navigator.pop();
    }
  };
  onRightPressed = () => {
    if (this.childrenRef && this.childrenRef.onRightPressed) {
      this.childrenRef.onRightPressed();
    }
  };
  getRef = (ref) => {
    this.childrenRef = ref;
  };
  renderBack() {
    return (
      <TouchableOpacity style={styles.left} onPress={this.onLeftPressed}>
        <Image source={backImage} />
      </TouchableOpacity>
    );
  }
  render() {
    const { children, routes } = this.props;
    const routeConfig = routes[routes.length - 1] || {};

    const { navigator, currentRoute } = this.context;
    const currentIndex = navigator.getCurrentRoutes().indexOf(currentRoute);

    const { leftNavTitle: left, rightNavTitle: right } = routeConfig;

    return (
      <View style={styles.container}>
        {
          !routeConfig.hideNavBar &&
            <View style={styles.navBar}>
              <Text style={styles.title} numberOfLines={1}>{routeConfig.title}</Text>
              { currentIndex > 0 && !left && this.renderBack() }
              {
                left && <TouchableOpacity style={styles.left} onPress={this.onLeftPressed}>
                  <Text style={styles.button}>{left}</Text>
                </TouchableOpacity>
              }
              {
                right && <TouchableOpacity style={styles.right} onPress={this.onRightPressed}>
                  <Text style={styles.button}>{right}</Text>
                </TouchableOpacity>
              }
            </View>
        }
        {React.cloneElement(children, { ref: this.getRef })}
      </View>
    );
  }
}
