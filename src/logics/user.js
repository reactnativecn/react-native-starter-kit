/**
 * Created by tdzl2003 on 12/18/16.
 */

import { observable } from 'mobx';
import validate from 'mobx-form-validate';
import { md5b64 } from '../utils/md5';
import { post } from './rpc';

export class LoginForm {
  @observable
  @validate(/^1\d{10}$/, '请输入正确的手机号')
  mobile = '';

  @observable
  @validate(/^.+$/, '请输入密码')
  pwd = '';

  async submit() {
    if (false) {
      const { token, uid } = await post('/login', {
        user: this.user,
        pwd: md5b64(this.pwd),
      });

    }
    return 1;
  }
}

export class RegisterForm {
  @observable
  @validate(/^1\d{10}$/, '请输入正确的手机号')
  mobile = '';

  @observable
  @validate(/^.+$/, '请输入密码')
  pwd = '';

  @observable
  @validate((value, self) => value !== self.pwd && '两次输入的密码必须一致!')
  pwdrpt = '';

  async submit() {
    if (false) {
      await post('/register', {
        user: this.user,
        pwd: md5b64(this.pwd),
      });
    }
    return 1;
  }
}
