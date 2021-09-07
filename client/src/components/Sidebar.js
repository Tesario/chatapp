import React, { useState, useRef, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import axios from "axios";

import "./Sidebar.scss";

function Sidebar(props) {
  const history = useHistory();
  const { notify, changeIsAuth } = props;
  const [isAuth, setIsAuth] = useState(false);
  const sidebar = useRef(null);

  useEffect(() => {
    isAuthFunc();

    if (window.location.href.includes("/chatroom/")) {
      sidebar.current.classList.add("sidebar--without-border");
    } else {
      sidebar.current.classList.remove("sidebar--without-border");
    }
  });

  const isAuthFunc = async () => {
    await axios({
      url: "/user/is-auth",
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then(() => {
        setIsAuth(true);
      })
      .catch(() => {
        setIsAuth(false);
      });
  };

  const handleTogglerClick = (e) => {
    if (sidebar.current.classList.contains("sidebar--active")) {
      sidebar.current.classList.remove("sidebar--active");
      return;
    }
    sidebar.current.classList.add("sidebar--active");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    notify({ success: true, message: "Logout was successful" });
    changeIsAuth(false);
    history.push("/login");
  };

  return (
    <div className="sidebar" ref={sidebar}>
      <div className="sidebar__items">
        <Link to="/" aria-label="Home">
          <i className="fas fa-home fa-fw"></i>
          <div className="link">Home</div>
        </Link>
        {!isAuth && (
          <Link to="/login" aria-label="Login">
            <i className="fas fa-user fa-fw"></i>
            <div className="link">Login</div>
          </Link>
        )}
        {isAuth && (
          <>
            <Link to="/create" aria-label="Chatrooms">
              <i className="fas fa-plus-circle fa-fw"></i>
              <div className="link">Chatrooms</div>
            </Link>
            <Link to="/settings" aria-label="Settings">
              <i className="fas fa-cog fa-fw"></i>
              <div className="link">Settings</div>
            </Link>
          </>
        )}
        {isAuth && (
          <a href="/" onClick={(e) => handleLogout(e)} aria-label="Logout">
            <i className="fas fa-sign-out-alt fa-fw"></i>
            <div className="link">Logout</div>
          </a>
        )}
      </div>
      <span className="sidebar__toggler" onClick={(e) => handleTogglerClick(e)}>
        <i className="fas fa-chevron-left fa-fw"></i>
      </span>
    </div>
  );
}

export default withRouter(Sidebar);
