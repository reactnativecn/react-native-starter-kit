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

const styles = StyleSheet.create({
  container: {
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
});

@observer
export default class FormItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object,
    children: PropTypes.string.isRequired,
  };
  static contextTypes = {
    form: PropTypes.object,
  };
  onChangeText = (text) => {
    const { name } = this.props;
    const form = this.context.form || this.props.form;
    form[name] = text;
  };
  render() {
    const { name, children, form:_, ...others } = this.props;
    const form = this.context.form || this.props.form;

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{children}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            {...others}
            value={form[name]}
            onChangeText={this.onChangeText}
            style={styles.input}
          />
        </View>
      </View>
    );
  }
}
