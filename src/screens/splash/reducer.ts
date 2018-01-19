import { handleActions } from 'redux-actions';
import { increment, decrement } from './actions';

export type StateType = number;

export default handleActions(
  {
    [increment.toString()]: (state, action) => state + 1,
    [decrement.toString()]: (state, action) => state - 1,
  },
  0,
);
