/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import route from '../../utils/routerDecorator';
import { LoginForm } from '../../logics/user';
import { FormItem, FormProvider } from '../../components/form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

@route('login')
export default class Login extends Component {
  form = new LoginForm();
  render() {
    return (
      <FormProvider form={this.form}>
        <View style={styles.container}>
          <FormItem name="mobile">用户名</FormItem>
          <FormItem name="pwd">密码</FormItem>
        </View>
      </FormProvider>
    );
  }
}
