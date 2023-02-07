import React, { memo } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Unprotected = memo(({ user, children }) => {
  if (user.id) return <Redirect to="/" />;
  else return <>{children}</>;
});

const mapStateToProps = (state) => ({
  user: state.users,
});

export default connect(mapStateToProps)(Unprotected);
