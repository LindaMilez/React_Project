import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import posts from "./reducers/posts";
import users from "./reducers/users";
import errors from "./reducers/errors";

const rootReducer = combineReducers({
  posts,
  users,
  errors,
});
export default createStore(rootReducer, applyMiddleware(thunk));
