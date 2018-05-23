import * as actionType from '../action-types';
import * as api from '../../server/api';

export const setUser = (user) => {
  return {
    type: actionType.SET_USER,
    user,
  };
}

export const loginOut = () => {
  return {
    type: actionType.LOGIN_OUT,
  };
}

export const getUserDetail = (username) => {
  return (dispatch) => {
    return api.getUserDetails(username).then((res) => {
      dispatch(setUser(res.data));
    });
  };
}
