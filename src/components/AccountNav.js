import React, { memo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../store/actions";

const AccountNav = memo((props) => {
  const { user } = props;
  
  return (
    <div className="account-nav">
      { user?.id && user?.name && <h4>{user?.name}</h4> }
      <ul>
        {user?.id ? (
          <>
            <li onClick={props.logout}>Signout</li>
          </>
        ) : (
          <>
            <Link to="/signin">
              <li>Signin</li>
            </Link>
            <Link to="/signup">
              <li>Signup</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
});

const mapStateToProps = (state) => ({
  user: state.users
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountNav);
