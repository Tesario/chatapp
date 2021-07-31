import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.scss";

function NotFound() {
  return (
    <div className="not-found container-fluid">
      <h1 className="not-found__title">Page not found - Error 404</h1>
      <Link to="/login" className="btn btn-primary">
        Back to login <i className="fas fa-user"></i>
      </Link>
    </div>
  );
}

export default NotFound;
