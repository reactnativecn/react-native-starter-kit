/**
 * Created by tdzl2003 on 12/18/16.
 */
/* eslint-disable react/forbid-prop-types */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react/native';
import camelCase from 'camelcase';

const styles = StyleSheet.create({
  container: {
  },
  row: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1,
  },
  inputWrapper: {
    flex: 3,
    borderWidth: 1,
    margin: 10,
  },
  input: {
    flex: 1,
    padding: 0,
  },
  error: {
    color: 'red',
  },
});

@observer
export default class FormItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object,
    children: PropTypes.string.isRequired,
    autoFocus: PropTypes.boolean,

    ...TextInput.propTypes,
  };
  static contextTypes = {
    form: PropTypes.object,
  };
  state = {
    focused: this.props.autoFocus,
  };
  onChangeText = (text) => {
    const { name } = this.props;
    const form = this.context.form || this.props.form;
    form[name] = text;
  };
  onFocus = () => {
    if (!this.state.focused) {
      this.setState({ focused: true });
    }
  };
  render() {
    const { name, children, form: _, ...others } = this.props;
    const { focused } = this.state;
    const form = this.context.form || this.props.form;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>{children}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              {...others}
              onFocus={this.onFocus}
              value={form[name]}
              onChangeText={this.onChangeText}
              style={styles.input}
            />
          </View>
        </View>
        <View>
          {focused && <Text style={styles.error}>{form[camelCase('validateError', name)]}</Text>}
        </View>
      </View>
    );
  }
}
