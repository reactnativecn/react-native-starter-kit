import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <TouchableOpacity>
        <Text>Bar</Text>
      </TouchableOpacity>
    );
  }
}
