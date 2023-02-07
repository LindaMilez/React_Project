import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const ErrorPopup = ({ error }) => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 5000);
    if (error.message) {
      setMsg(error.message);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return msg ? <div className="error-popup">{JSON.stringify(msg)}</div> : <></>;
};

const mapStateToProps = (state) => ({ error: state.errors });

export default connect(mapStateToProps)(ErrorPopup);
