import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import "./Login.scss";

function Login(props) {
  const [state, setState] = useState({
    email: "vtesar2003@gmail.com",
    password: "",
  });
  const { notify } = props;

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (state.email && state.password) {
      axios({
        url: "/user/login",
        method: "POST",
        data: state,
      })
        .then((response) => {
          notify(response.data);
          setState({ ...state, password: "" });
          if (response.data.status) {
            sessionStorage.setItem("token", response.data.token);
            props.history.push("/create");
          }
        })
        .catch((error) => {
          notify(error.message);
        });
      return;
    }
    notify({ message: "You must fill all fields!" });
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
            type="email"
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
