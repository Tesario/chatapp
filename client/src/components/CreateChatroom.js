import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./CreateChatroom.scss";

function CreateChatroom(props) {
  const history = useHistory();
  const [state, setState] = useState({
    name: "",
    isPrivate: false,
    password: "",
    userId: null,
  });
  const [joinRoomState, setJoinRoomState] = useState({
    joinName: "",
    joinPassword: "",
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
        setState({ name: "", isPrivate: false, password: "" });
        history.push("/chatroom/" + res.data.chatroom.name);
      })
      .catch((error) => {
        notify(error.response.data);
        setState({ ...state, name: "", password: "" });
      });
  };

  const onJoinFormSubmit = async (e) => {
    e.preventDefault();
    if (joinRoomState.joinName && joinRoomState.joinPassword) {
      return await axios({
        url: "/chatroom/join/private/" + joinRoomState.joinName,
        method: "PUT",
        data: joinRoomState,
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          notify(response.data);
          getChatrooms();
          history.push("/chatroom/" + joinRoomState.joinName);
        })
        .catch((error) => {
          notify(error.response.data);
        });
    }
    notify({ success: false, message: "Fill name and password" });
    return;
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  const handleJoinChange = (e) => {
    setJoinRoomState({ ...joinRoomState, [e.target.name]: e.target.value });
  };

  const getChatrooms = async () => {
    await axios({
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

  const handleJoin = async (name) => {
    await axios({
      url: "/chatroom/join/" + name,
      method: "PUT",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        notify(response.data);
        getChatrooms();
        history.push("/chatroom/" + name);
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleJoin(chatroom.name)}
            >
              Join
            </button>
          </li>
        );
      });
    }
  };

  return (
    <div className="chatroom container-fluid">
      <div className="forms">
        <div className="create-chatroom">
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
                <label htmlFor="name">Chatroom name</label>
              </div>
              <button className="btn btn-primary" aria-label="Create">
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div
              className={
                (state.isPrivate ? "" : "hide ") + "form-floating password"
              }
            >
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Chatroom name"
                autoComplete="off"
                value={state.password}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="password">Chatroom password</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                name="isPrivate"
                type="checkbox"
                id="isPrivate"
                checked={state.isPrivate}
                onChange={(e) => handleCheck(e)}
              />
              <label className="form-check-label" htmlFor="isPrivate">
                Private
              </label>
            </div>
          </form>
        </div>
        <div className="join-chatroom">
          <h1 className="chatroom__title">
            Join to private room <i className="fas fa-key"></i>
          </h1>
          <p className="chatroom__desc">You can join to private chatroom!</p>
          <form onSubmit={(e) => onJoinFormSubmit(e)}>
            <div className="form-floating">
              <input
                type="text"
                name="joinName"
                id="joinName"
                className="form-control"
                placeholder="Chatroom name"
                autoComplete="off"
                value={joinRoomState.name}
                onChange={(e) => handleJoinChange(e)}
              />
              <label htmlFor="joinName">Chatroom name</label>
            </div>
            <div className="form-footer">
              <div className="form-floating">
                <input
                  type="password"
                  name="joinPassword"
                  id="joinPassword"
                  className="form-control"
                  placeholder="Chatroom password"
                  autoComplete="off"
                  value={joinRoomState.password}
                  onChange={(e) => handleJoinChange(e)}
                />
                <label htmlFor="password">Chatroom password</label>
              </div>
              <button className="btn btn-primary">Join</button>
            </div>
          </form>
        </div>
      </div>
      <div className="chatroom__list">
        <div className="subtitle">Public chatrooms</div>
        <ul className="chatroom__list__inner">{renderChatrooms()}</ul>
      </div>
    </div>
  );
}

export default CreateChatroom;
