/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { FadeModal } from '../../SceneConfig';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
  },
});

export default class TestModal extends Component {
  static sceneConfig = FadeModal;
  static contextTypes = {
    navigator: PropTypes.object,
  };
  dismiss = () => {
    const { navigator } = this.context;
    navigator.pop();
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.dismiss}>
        <View style={styles.background}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <Text>Hello, modal</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
