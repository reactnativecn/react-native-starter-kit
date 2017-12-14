import { View, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';
import styles = require('./Splash.style');
import { NavigationScreenProps } from 'react-navigation';
import { autoFlow } from '../utils/autoFlow';
import { SagaIterator } from 'redux-saga';
import { connect } from 'react-redux';
import { take, call, setContext } from 'redux-saga/effects';
import { takeInScreen, putInScreen, connectScreen } from '../utils/screenAction';
import { Action, ActionCreator } from 'redux';

import { handleActions, combineActions, createAction } from 'redux-actions';


interface SplashParam{
  counter: number;
};

const foo = createAction('FOO');
const bar = createAction('BAR');

type PropType = NavigationScreenProps<SplashParam> & ({foo: typeof foo, bar: typeof bar});

@autoFlow
class Splash extends React.Component<any> {
  static navigationOptions = {
      header: null,
  };

  static reducer(state: SplashParam, action: Action & {payload: number}): SplashParam {
    return {
      ...state,
      counter: action.payload,
    };
  }

  static *flow(): SagaIterator {
  }

  onPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Splash');
  };
  back = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };
  render() {
    const { foo, bar } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={bar}>
        <TouchableOpacity onPress={foo}>
          <Text>Back</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

export default connectScreen(null, {
  foo,
}, {
  bar,
})(Splash);
