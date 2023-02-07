import {
  addPostAndFetch,
  deletePostAndFetch,
  doSignIn,
  doSignOut,
  doSignUp,
  getAllPosts,
  getCategories,
  getPostsByAuthor,
  getPostsByCategory,
  initUser,
} from "../../services";
export const actionTypes = {
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  INIT_SUCCESS: "INIT_SUCCESS",
  INIT_FAILURE: "INIT_FAILURE",
  SIGNUP_FAILURE: "SIGNUP_FAILURE",
  SIGNOUT_SUCCESS: "SIGNOUT_SUCCESS",
  SIGNOUT_FAILURE: "SIGNOUT_FAILURE",
  GET_POSTS_SUCCESS: "GET_POSTS_SUCCESS",
  DELETE_POSTS_SUCCESS: "DELETE_POSTS_SUCCESS",
  GET_CATEGORIES_SUCCESS: "GET_CATEGORIES_SUCCESS",
  ADD_POST_SUCCESS: "ADD_POST_SUCCESS",
  GET_POSTS_FAILURE: "GET_POSTS_FAILURE",
  GET_CATEGORIES_FAILURE: "GET_CATEGORIES_FAILURE",
  SIGNIN_FAILURE: "SIGNIN_FAILURE",
  ADD_POST_FAILURE: "ADD_POST_FAILURE",
  DELETE_POST_FAILURE: "DELETE_POST_FAILURE",
  SET_ERROR_MESSAGE: "SET_ERROR_MESSAGE",
};

export const signIn = (email, password, history, location) => (dispatch) => {
  doSignIn(email, password)
    .then((user) => {
      if (user) {
        dispatch({ type: actionTypes.SIGNIN_SUCCESS, user });
        const { from } = location.state || { from: { pathname: "/" } };
        history.replace(from);
      } else {
        dispatch({ type: actionTypes.SIGNIN_FAILURE, error: "Signin failed" });
      }
    })
    .catch((error) => {
      dispatch({ type: actionTypes.SIGNIN_FAILURE, error: error });
    });
};

export const signUp = (name, email, password, history) => (dispatch) => {
  doSignUp(name, email, password)
    .then((user) => {
      dispatch({ type: actionTypes.SIGNUP_SUCCESS, user });
      history.push("/");
    })
    .catch((error) => {
      dispatch({ type: actionTypes.SIGNUP_FAILURE, error: error });
    });
};

export const signOut = () => (dispatch) => {
  doSignOut()
    .then(() => dispatch({ type: actionTypes.SIGNOUT_SUCCESS }))
    .catch(() =>
      dispatch({ type: actionTypes.SIGNOUT_FAILURE, error: "Signout failed" })
    );
};

export const initUserState = () => (dispatch) => {
  initUser()
    .then((user) => dispatch({ type: actionTypes.INIT_SUCCESS, user }))
    .catch((error) =>
      dispatch({ type: actionTypes.INIT_FAILURE, error: error })
    );
};

export const fetchPosts = () => (dispatch) => {
  getAllPosts()
    .then((posts) =>
      dispatch({ type: actionTypes.GET_POSTS_SUCCESS, posts: posts })
    )
    .catch((error) =>
      dispatch({ type: actionTypes.GET_POSTS_FAILURE, error: error })
    );
};

export const fetchPostsByAuthor = (authorId) => (dispatch) => {
  getPostsByAuthor(authorId)
    .then((posts) =>
      dispatch({ type: actionTypes.GET_POSTS_SUCCESS, posts: posts })
    )
    .catch((error) =>
      dispatch({ type: actionTypes.GET_POSTS_FAILURE, error: error })
    );
};

export const fetchPostsByCategory = (categoryId) => (dispatch) => {
  getPostsByCategory(categoryId)
    .then((posts) =>
      dispatch({ type: actionTypes.GET_POSTS_SUCCESS, posts: posts })
    )
    .catch((error) =>
      dispatch({ type: actionTypes.GET_POSTS_FAILURE, error: error })
    );
};

export const fetchCategories = () => (dispatch) => {
  getCategories()
    .then((categories) =>
      dispatch({ type: actionTypes.GET_CATEGORIES_SUCCESS, categories })
    )
    .catch((error) =>
      dispatch({ type: actionTypes.GET_CATEGORIES_FAILURE, error: error })
    );
};

export const addPost = (post, history) => (dispatch) => {
  addPostAndFetch(post)
    .then((newPost) => {
      const { author, title, content, categories, timestamp } = newPost;
      dispatch({
        type: actionTypes.ADD_POST_SUCCESS,
        post: { author, title, categories, content, timestamp },
      });
      history.push("/");
    })
    .catch((error) => {
      dispatch({ type: actionTypes.ADD_POST_FAILURE, error: error });
    });
};

export const deletePost = (postId) => (dispatch) => {
  deletePostAndFetch(postId)
    .then((posts) =>
      dispatch({ type: actionTypes.DELETE_POSTS_SUCCESS, posts })
    )
    .catch((err) => {
      dispatch({ type: actionTypes.DELETE_POST_FAILURE, error: err });
    });
};

export const setError = (error) => (dispatch) => {
  dispatch({ type: actionTypes.SET_ERROR_MESSAGE, error });
};
