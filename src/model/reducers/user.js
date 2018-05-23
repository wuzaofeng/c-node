import * as actionType from '../action-types';

const defaultState = {
  token: '',
  avatar_url: '',
  id: '',
  loginname: '',
  login: false,
}

const user = (state = defaultState, action) => {
  const { SET_USER, LOGIN_OUT } = actionType;
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.user,
        login: true,
      };
    case LOGIN_OUT:
      return {
        ...state,
        ...defaultState,
        login: false,
      }
    default:
      return state;
  }
}

export default user;
