import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setError, signUp } from "../store/actions";
import Input from "./Input";

const Signup = (props) => {
  const [user, setUser] = useState({});
  const history = useHistory();

  const { name = "", email = "", password = "", repassword = "" } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      props.setError("Please provide name");
    } else if (!email) {
      props.setError("Please provide email");
    } else if (!password) {
      props.setError("Please provide password");
    } else if (password !== repassword) {
      props.setError("Password and Retyped Password didn't match");
    } else {
      props.signUp(name, email, password, history);
    }
  };

  return (
    <div className="sign-up">
      <h2>Signup</h2>
      <div className="signup-form">
        <Input
          type="text"
          label="Name"
          value={name}
          name="name"
          onInput={handleChange}
        />
        <Input
          type="email"
          label="E-Mail"
          value={email}
          name="email"
          onInput={handleChange}
        />
        <Input
          type="password"
          label="Password"
          value={password}
          name="password"
          onInput={handleChange}
        />
        <Input
          type="password"
          label="Retype Password"
          value={repassword}
          name="repassword"
          onInput={handleChange}
        />
        <button onClick={handleSubmit}>Done!</button>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  signUp: (name, email, password, history) =>
    dispatch(signUp(name, email, password, history)),
  setError: (error) => dispatch(setError(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
