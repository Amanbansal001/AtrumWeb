import {
  LOGIN_WITH_PASSWORD_SUCCESS,
  LOGIN_WITH_PASSWORD_ERROR,
} from "../actionType";
const INITIAL_STATE = {
  isLoggedIn: false,
};
const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_WITH_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN_WITH_PASSWORD_ERROR:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
export default login;
