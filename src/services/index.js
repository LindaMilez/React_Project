const responseErrorHandler = (response) => {
  if (!response.ok) {
    throw response;
  }
  return response;
};

const getToken = () =>
  new Promise((resolve, reject) => {
    try {
      const getToken = window.localStorage.getItem("tinyThoughtsJWT");
      resolve({ token: getToken });
    } catch {
      reject();
    }
  });

export const getAllPosts = () =>
  fetch("/api/posts")
    .then(responseErrorHandler)
    .then((res) => res.json());

export const getPostsByAuthor = (authorId) =>
  fetch(`/api/posts/author/${authorId}`)
    .then(responseErrorHandler)
    .then((res) => res.json());

export const getPostsByCategory = (categoryId) =>
  fetch(`/api/posts/category/${categoryId}`)
    .then(responseErrorHandler)
    .then((res) => res.json());

export const getCategories = () =>
  fetch("/api/categories")
    .then(responseErrorHandler)
    .then((res) => res.json());

export const doSignIn = (email, password) =>
  new Promise((resolve, reject) => {
    return fetch("/api/signin", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(responseErrorHandler)
      .then((res) => res.json())
      .then((data) => {
        const { token, user } = data;
        window.localStorage.setItem("tinyThoughtsJWT", token);
        window.localStorage.setItem("tinyThoughtsUser", JSON.stringify(user));
        resolve(user);
      })
      .catch((error) => {
        error.json().then(({ error }) => reject(error));
      });
  });

export const doSignUp = (name, email, password) =>
  new Promise((resolve, reject) => {
    return fetch("/api/signup", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, dateJoined: new Date() }),
    })
      .then(responseErrorHandler)
      .then((res) => res.json())
      .then((data) => {
        const { token, user } = data;
        window.localStorage.setItem("tinyThoughtsJWT", token);
        window.localStorage.setItem("tinyThoughtsUser", JSON.stringify(user));
        resolve(user);
      })
      .catch((error) => {
        error.json().then(({ error }) => reject(error));
      });
  });

export const doSignOut = () =>
  new Promise((resolve, reject) => {
    try {
      window.localStorage.removeItem("tinyThoughtsJWT");
      window.localStorage.removeItem("tinyThoughtsUser");
      resolve(true);
    } catch {
      reject(false);
    }
  });

export const initUser = () =>
  new Promise((resolve, reject) => {
    try {
      const getToken = window.localStorage.getItem("tinyThoughtsJWT");
      const getUser = JSON.parse(
        window.localStorage.getItem("tinyThoughtsUser")
      );
      if (getToken) {
        return fetch("/api/verify", {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: getToken }),
        })
          .then(responseErrorHandler)
          .then((res) => res.json())
          .then(() => resolve(getUser))
          .catch(() => {
            window.localStorage.removeItem("tinyThoughtsJWT");
            window.localStorage.removeItem("tinyThoughtsUser");
            reject("User state could not be initialized");
          });
      }
    } catch {
      resolve({});
    }
  });

export const addPostAndFetch = (post) =>
  getToken()
    .then(({ token }) =>
      fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        body: JSON.stringify(post),
      })
    )
    .then(responseErrorHandler)
    .then((res) => res.json())
    .then(({ id }) => fetch(`/api/posts/${id}`))
    .then(responseErrorHandler)
    .then((res) => res.json());

export const deletePostAndFetch = (postId) =>
  getToken()
    .then(({ token }) =>
      fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      })
    )
    .then(responseErrorHandler)
    .then((res) => res.json())
    .then(() => getAllPosts());
