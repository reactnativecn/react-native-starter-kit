/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, { PropTypes, Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import route from '../../utils/routerDecorator';
import { LoginForm } from '../../logics/user';
import { FormItem, FormProvider, Submit } from '../../components/form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
});

@route('login')
export default class Login extends Component {
  static contextTypes = {
    navigator: PropTypes.object,
  };
  form = new LoginForm();
  onSubmit = async () => {
    try {
      await this.form.submit();
      this.context.navigator.replace({location: '/home/home'});
    } catch (err) {
      switch (err.code) {
        case 403:
          alert('用户名或密码错误');
          break;
        default:
          alert('登录失败');
          break;
      }
    }
  };
  render() {
    return (
      <FormProvider form={this.form}>
        <View style={styles.container}>
          <FormItem name="mobile" underlineColorAndroid="transparent">用户名</FormItem>
          <FormItem secureTextEntry name="pwd">密码</FormItem>
          <Submit onSubmit={this.onSubmit}>登录</Submit>
        </View>
      </FormProvider>
    );
  }
}
