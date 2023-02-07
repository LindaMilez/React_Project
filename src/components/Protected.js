import React from "react";
import { connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

const Protected = ({ user, children }) => {
  const location = useLocation();
  if (!user.id) return <Redirect to={{ pathname: "/signin", state: { from: location } }} />
  else return <>{children}</>;
};

const mapStateToProps = (state) => ({
  user: state.users,
});

export default connect(mapStateToProps)(Protected);
