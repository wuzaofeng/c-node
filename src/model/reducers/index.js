import { combineReducers } from 'redux';
import * as ActionTypes from '../action-types';
import user from './user';

function appState(state = { data: 'Hello from redux!' }, action) {
  switch (action.type) {
    case ActionTypes.SYNC_ACTION:
      return { ...state, data: action.data };
    default:
      return state;
  }
}

export default combineReducers({
  appState,
  user,
});
