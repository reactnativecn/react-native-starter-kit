/**
 * Created by Yun on 2016-12-10.
 */
import React, { Component, PropTypes } from 'react';

export default class FormProvider extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    form: PropTypes.object,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    form: PropTypes.object,
  };

  getChildContext() {
    return {
      form: this.props.form,
    };
  }
  render() {
    return React.Children.only(this.props.children);
  }
}
