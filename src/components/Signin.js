import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { signIn } from "../store/actions";
import Input from "./Input";

const Signin = (props) => {
  const [user, setUser] = useState({});
  const location = useLocation();
  const history = useHistory();

  const { email = '', password = '' } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(u => ({ ...u, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn(email, password, history, location);
  }

  return (
    <div className="sign-in">
      <h2>Signin</h2>
      <div className="signin-form">
        <Input maxLength="100" required type="email" label="E-Mail" value={email} name="email" onInput={handleChange} />
        <Input maxLength="30" required type="password" label="Password" value={password} name="password" onInput={handleChange} />
        <button onClick={handleSubmit}>Go!</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.error
});
const mapDispatchToProps = (dispatch) => ({
  signIn: (email, password, history, location) => dispatch(signIn(email, password, history, location))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
