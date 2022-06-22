import {
  GET,
  GET_SUCCESS,
  GET_ERROR,
  POST,
  POST_SUCCESS,
  POST_ERROR,
} from "../actionType";
const INITIAL_STATE = {
  data: null,
  add: '',
  isLogout: false
};
const crud = (state = INITIAL_STATE, action) => {
 
  switch (action.type) {
    case GET:
      return {
        ...state,
        data: action.payload,
      };

    case GET_SUCCESS:
      return {

        ...state,
        data: action.payload,
      };
    case GET_ERROR:
      return {
        ...state,
        data: action.payload,
      };

    case POST:
      return {
        ...state,
        data: action.payload,
      };

    case POST_SUCCESS:
      return {

        ...state,
        data: action.payload.data,
      };
    case POST_ERROR:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return {
        ...state, data: null,
      };
  }
};
export default crud;
