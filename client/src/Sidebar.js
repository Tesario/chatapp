import React, { useState, useRef, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import "./Sidebar.scss";

function Sidebar(props) {
  const [isAuth, setIsAuth] = useState(false);
  const sidebar = useRef(null);

  useEffect(() => {
    axios({
      url: "/user/isUserAuth",
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        setIsAuth(response.data.auth);
      })
      .catch((err) => {
        console.log(err.message);
      });

    if (window.location.href.includes("/chatroom/")) {
      sidebar.current.classList.add("sidebar--without-border");
    } else {
      sidebar.current.classList.remove("sidebar--without-border");
    }
  });

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
    props.history.push("/login");
  };

  return (
    <div className="sidebar" ref={sidebar}>
      <div className="sidebar__items">
        {isAuth && (
          <Link to="/">
            <i className="fas fa-home fa-fw"></i>
            <div className="link">Chat</div>
          </Link>
        )}
        {!isAuth && (
          <Link to="/login">
            <i className="fas fa-user fa-fw"></i>
            <div className="link">Login</div>
          </Link>
        )}
        {isAuth && (
          <>
            <Link to="/create">
              <i className="fas fa-plus-circle fa-fw"></i>
              <div className="link">Create&nbsp;channel</div>
            </Link>

            <Link to="/settings">
              <i className="fas fa-cog fa-fw"></i>
              <div className="link">Settings</div>
            </Link>
          </>
        )}
        <Link to="/info">
          <i className="fas fa-info-circle fa-fw"></i>
          <div className="link">Information</div>
        </Link>
        {isAuth && (
          <a href="/#" onClick={(e) => handleLogout(e)}>
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
