import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Forbidden.scss";

function NotFound(props) {
  const { changeIsHomepage } = props;

  useEffect(() => {
    changeIsHomepage(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="forbidden container-fluid">
      <h1 className="forbidden__title">Forbidden - Error 403</h1>
      <Link to="/login" className="btn btn-primary">
        Back to login <i className="fas fa-user"></i>
      </Link>
    </div>
  );
}

export default NotFound;
