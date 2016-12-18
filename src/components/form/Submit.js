/**
 * Created by tdzl2003 on 12/18/16.
 */
/* eslint-disable react/forbid-prop-types */

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { observer } from 'mobx-react/native';

const styles = StyleSheet.create({
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    marginVertical: 5,
    borderRadius: 5,
  },
  active: {
    backgroundColor: 'blue',
  },
});

@observer
export default class Submit extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    form: PropTypes.object,
    onSubmit: PropTypes.func,
  };
  static contextTypes = {
    form: PropTypes.object,
  };
  render() {
    const { children, onSubmit } = this.props;
    const form = this.context.form || this.props.form;
    return (
      <TouchableOpacity
        style={[styles.button, form.isValid && styles.active]}
        disabled={!form.isValid}
        onPress={onSubmit}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
}
