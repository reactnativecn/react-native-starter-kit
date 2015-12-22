/**
 * Created by Yun on 2015-12-21.
 */
import { createAction, handleActions } from 'redux-actions';

// Action types;
export const INITIAL_OVER = 'app/session/initial_over';

// Initial state
const initialState = null;

// reducer
const reducer = handleActions({
  [INITIAL_OVER]: (state, action) => {
    return action.payload;
  },
}, initialState);
export default reducer;

// action creators:
export const initialOver = createAction(INITIAL_OVER);

// async action creators: create async function as redux-thunk.
export function init() {
  return async (dispatch) => {
    const info = await fetch('/users/me');
    dispatch(initialOver(info));
  };
}
