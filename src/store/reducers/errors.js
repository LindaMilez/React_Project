import { actionTypes } from "../actions";

const initialState = {
  error: false,
  message: "",
};
const errors = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS_FAILURE:
    case actionTypes.GET_CATEGORIES_FAILURE:
    case actionTypes.SIGNIN_FAILURE:
    case actionTypes.SIGNUP_FAILURE:
    case actionTypes.INIT_FAILURE:
    case actionTypes.ADD_POST_FAILURE:
    case actionTypes.DELETE_POST_FAILURE:
    case actionTypes.SET_ERROR_MESSAGE:
      return {
        error: true,
        message: action.error,
      };
    case actionTypes.GET_POSTS_SUCCESS:
    case actionTypes.GET_CATEGORIES_SUCCESS:
    case actionTypes.SIGNIN_SUCCESS:
    case actionTypes.INIT_SUCCESS:
    case actionTypes.ADD_POST_SUCCESS:
    case actionTypes.DELETE_POST_SUCCESS:
    case actionTypes.RESET_ERROR:
      return { error: false, message: "" };
    default:
      return state;
  }
};

export default errors;
