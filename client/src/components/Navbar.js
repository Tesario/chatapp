import React, { useRef } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import axios from "axios";

import "./Navbar.scss";

function Navbar(props) {
  const history = useHistory();
  const { notify, changeIsAuth, isAuth } = props;
  const navbar = useRef(null);

  const handleLogout = async (e) => {
    e.preventDefault();
    await axios({
      url: "https://tesar-chatapp.herokuapp.com/user/status/false",
      method: "PUT",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    });
    sessionStorage.removeItem("token");
    notify({ success: true, message: "Logout was successful" });
    changeIsAuth(false);
    history.push("/login");
  };

  return (
    <div className="navbar" ref={navbar}>
      <div className="navbar-items">
        {!isAuth && (
          <>
            <Link to="/" aria-label="Homepage">
              <i className="fas fa-home"></i>
            </Link>
            <Link to="/login" aria-label="Login">
              <i className="fas fa-user fa-fw"></i>
            </Link>
          </>
        )}
        {isAuth && (
          <>
            <Link to="/" aria-label="Home">
              <i className="fas fa-comments"></i>
            </Link>
            <Link to="/create" aria-label="Chatrooms">
              <i className="fas fa-plus-circle fa-fw"></i>
            </Link>
            <Link to="/settings" aria-label="Settings">
              <i className="fas fa-cog fa-fw"></i>
            </Link>
          </>
        )}
        {isAuth && (
          <a href="/" onClick={(e) => handleLogout(e)} aria-label="Logout">
            <i className="fas fa-sign-out-alt fa-fw"></i>
          </a>
        )}
      </div>
    </div>
  );
}

export default withRouter(Navbar);
