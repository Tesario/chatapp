import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./CreateChatroom.scss";

function CreateChatroom(props) {
  const [state, setState] = useState({
    name: "",
    private: false,
    userId: null,
  });
  const [chatrooms, setChatrooms] = useState([]);
  const { notify } = props;

  useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    await axios({
      url: "/chatroom/create",
      method: "POST",
      data: state,
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        notify(res.data);
        setState({ name: "", private: false });
        getChatrooms();
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  const getChatrooms = () => {
    axios({
      url: "/chatroom/public",
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        notify(response.data);
        setChatrooms(response.data);
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const renderChatrooms = () => {
    if (chatrooms.length) {
      return chatrooms.map((chatroom, index) => {
        return (
          <li key={index} className="chatroom__list__inner__item">
            {chatroom.name}
            <Link className="btn btn-primary" to={"/chatroom/" + chatroom._id}>
              Join
            </Link>
          </li>
        );
      });
    }
  };

  return (
    <div className="chatroom container-fluid">
      <h1 className="chatroom__title">
        Create room <i className="fas fa-comments"></i>
      </h1>
      <p className="chatroom__desc">You can create your own chatroom!</p>
      <form className="chatroom__form" onSubmit={(e) => onFormSubmit(e)}>
        <div className="chatroom__form__inner">
          <div className="form-floating">
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Chatroom name"
              autoComplete="off"
              value={state.name}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="email">Chatroom name</label>
          </div>
          <button className="btn btn-primary" aria-label="Create">
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="private"
            type="checkbox"
            id="private"
            checked={state.private}
            onChange={(e) => handleCheck(e)}
          />
          <label className="form-check-label" htmlFor="private">
            Private
          </label>
        </div>
      </form>
      <div className="chatroom__list">
        <div className="subtitle">Public chatrooms</div>
        <ul className="chatroom__list__inner">{renderChatrooms()}</ul>
      </div>
    </div>
  );
}

export default CreateChatroom;
