import { actionTypes } from "../actions";

const initialState = {};

const users = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESS:
    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.INIT_SUCCESS:
      return { ...action.user };
    case actionTypes.INIT_FAILURE:
    case actionTypes.SIGNUP_FAILURE:
    case actionTypes.SIGNOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default users;
