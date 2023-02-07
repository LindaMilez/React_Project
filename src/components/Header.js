import React from "react";
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";

const Header = ({ user }) => {
  return (
    <div className="header">
      <div className="app-title">TinyThoughts</div>
      <div className="app-nav">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/add">
            <li>New Post</li>
          </Link>
        </ul>
      </div>
      <AccountNav />
    </div>
  );
};

export default Header;