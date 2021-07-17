import React, { useState, useRef, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import "./Sidebar.scss";

function Sidebar(props) {
  const { notify } = props;
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

  const isAuthFunc = () => {
    if (sessionStorage.getItem("token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
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
    props.history.push("/login");
  };

  return (
    <div className="sidebar" ref={sidebar}>
      <div className="sidebar__items">
        {!isAuth && (
          <Link to="/login" aria-label="Login">
            <i className="fas fa-user fa-fw"></i>
            <div className="link">Login</div>
          </Link>
        )}
        {isAuth && (
          <>
            <Link to="/" aria-label="Home">
              <i className="fas fa-home fa-fw"></i>
              <div className="link">Home</div>
            </Link>
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
        <Link to="/info" aria-label="Information">
          <i className="fas fa-info-circle fa-fw"></i>
          <div className="link">Information</div>
        </Link>
        {isAuth && (
          <a href="/#" onClick={(e) => handleLogout(e)} aria-label="Logout">
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
