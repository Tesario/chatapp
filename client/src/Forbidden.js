import React from "react";
import { Link } from "react-router-dom";

import "./Forbidden.scss";

function NotFound() {
  return (
    <div className="forbidden container-fluid">
      <h1 className="forbidden__title">Forbidden - Error 403</h1>
      <Link to="/login" className="btn btn-primary">
        Back to login <i class="fas fa-user"></i>
      </Link>
    </div>
  );
}

export default NotFound;
