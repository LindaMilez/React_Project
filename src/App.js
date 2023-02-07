import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AddPost from "./components/AddPost";
import ErrorPopup from "./components/ErrorPopup";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Protected from "./components/Protected";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Unprotected from "./components/Unprotected";
import { fetchCategories, initUserState } from "./store/actions";

const App = (props) => {
  useEffect(() => {
    props.initUserState();
    props.fetchCategories();
  });

  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/author/:authorId">
          <Posts type="author" />
        </Route>
        <Route exact path="/category/:categoryId">
          <Posts type="category" />
        </Route>
        <Route exact path="/signin">
          <Unprotected>
            <Signin />
          </Unprotected>
        </Route>
        <Route exact path="/signup">
          <Unprotected>
            <Signup />
          </Unprotected>
        </Route>
        <Route exact path="/add">
          <Protected>
            <AddPost />
          </Protected>
        </Route>
        <Route exact path="/" component={Posts} />
      </Switch>
      <ErrorPopup />
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  initUserState: () => dispatch(initUserState()),
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
