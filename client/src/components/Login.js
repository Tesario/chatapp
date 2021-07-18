import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, withRouter, useHistory } from "react-router-dom";

import "./Login.scss";

function Login(props) {
  const history = useHistory();
  const [state, setState] = useState({
    email: "vtesar2003@gmail.com",
    password: "",
  });
  const { notify } = props;

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      history.push("/");
    }
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios({
        url: "/user/login",
        method: "post",
        data: state,
      }).then((res) => {
        setState({ email: "", password: "" });
        notify(res.data);
        sessionStorage.setItem("token", res.data.token);
        history.push("/");
      });
    } catch (error) {
      setState({ ...state, password: "" });
      notify(error.response.data);
    }
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="login container-fluid">
      <h1 className="login__title">Login</h1>
      <form className="login__form" onSubmit={(e) => onFormSubmit(e)}>
        <div className="form-floating">
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Email"
            autoComplete="off"
            value={state.email}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            autoComplete="off"
            value={state.password}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <Link className="register-link" to="/register">
          Don't have an account yet?
        </Link>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default withRouter(Login);
