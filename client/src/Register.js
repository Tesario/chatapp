import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import "./Register.scss";

function Register(props) {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const { notify } = props;

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (state.name && state.email && state.password) {
      axios({
        url: "/user/create",
        method: "POST",
        data: state,
      })
        .then((response) => {
          setState({ name: "", email: "", password: "" });
          notify(response.data);

          if (response.data.status) {
            sessionStorage.setItem("token", response.data.token);
            props.history.push("/create");
          }
        })
        .catch((error) => {
          notify(error);
        });
      return;
    }
    notify({ message: "You must fill all fields!" });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="register container-fluid">
      <h1 className="register__title">Register</h1>
      <form className="register__form" onSubmit={(e) => onFormSubmit(e)}>
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
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            autoComplete="off"
            value={state.name}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="email">Name</label>
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
        <Link className="login-link" to="/login">
          Already have an account?
        </Link>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default withRouter(Register);
