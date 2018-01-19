import { View, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';
import styles = require('./Splash.style');
import { NavigationScreenProps } from 'react-navigation';
import { SagaIterator } from 'redux-saga';
import { connect } from 'react-redux';
import { take, call, setContext } from 'redux-saga/effects';
import { Action, ActionCreator } from 'redux';

import { handleActions, combineActions, createAction } from 'redux-actions';
import { ComponentClass } from 'react';

import * as actions from './actions';
import { StateType } from './reducer';
import { WidgetProps } from '../../store/widgetState';

type PropTypes = typeof actions & WidgetProps<StateType> & NavigationScreenProps<void>;

export default class Splash extends React.Component<PropTypes> {
  static navigationOptions = {
      header: null,
  };
  render() {
    const { increment, decrement } = this.props;
    return (
      <View style={styles.container}>
        <Text>Current value: {this.props.widgetState}</Text>
        <TouchableOpacity onPress={increment}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decrement}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

