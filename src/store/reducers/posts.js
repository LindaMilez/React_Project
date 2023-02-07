import { actionTypes } from "../actions";

const initialState = {
  posts: [],
  categories: [],
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS_SUCCESS:
    case actionTypes.DELETE_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts,
      };
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories,
      };
    case actionTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [action.post, ...state.posts],
      };
    default:
      return state;
  }
};

export default posts;
