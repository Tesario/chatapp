import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import "./Register.scss";

function Register(props) {
  const [state, setState] = useState({
    email: "",
    name: "",
    password: "",
    passwordAgain: "",
  });
  const { notify } = props;

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      props.history.push("/create");
    }
  }, [props.history]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "POST",
        url: "/user/register",
        data: state,
      }).then((res) => {
        setState({ name: "", email: "", password: "", passwordAgain: "" });
        notify(res.data);
        sessionStorage.setItem("token", res.data.token);
        props.history.push("/create");
      });
    } catch (err) {
      notify(err.response.data);
    }
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
        <div className="form-floating">
          <input
            type="password"
            name="passwordAgain"
            className="form-control"
            placeholder="Password again"
            autoComplete="off"
            value={state.passwordAgain}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="passwordAgain">Password again</label>
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
