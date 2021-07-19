import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Home.scss";

function Home(props) {
  const { notify } = props;
  const [chatrooms, setChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState(null);

  useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  const getChatrooms = async () => {
    await axios({
      method: "GET",
      url: "chatroom/get-user-chatrooms",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setChatrooms(res.data.chatrooms);
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const handleLeave = async (name) => {
    await axios({
      method: "PUT",
      url: "chatroom/" + name + "/leave",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        notify(res.data);
        getChatrooms();
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const renderChatrooms = () => {
    if (chatrooms.length) {
      return chatrooms.map((chatroom, index) => {
        return (
          <li
            key={index}
            className="flex-item"
            onMouseEnter={() => {
              setCurrentChatroom(chatroom);
            }}
          >
            <Link className="link" to={"/chatroom/" + chatroom.name}>
              <div className="name">{chatroom.name}</div>
              <div className="members">
                {chatroom.members.length}
                <i className="fas fa-users"></i>
              </div>
            </Link>
            <button
              type="button"
              className="btn leave"
              aria-label="Leave chatroom"
              onClick={() => handleLeave(chatroom.name)}
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </li>
        );
      });
    }
    return <div>No chatrooms found</div>;
  };

  const renderInfo = () => {
    if (currentChatroom) {
      const { name, isPrivate, members } = currentChatroom;
      return (
        <>
          <div className="flex-header">
            <div>{name}</div>
            {isPrivate ? (
              <i className="fas fa-lock"></i>
            ) : (
              <i className="fas fa-lock-open"></i>
            )}
          </div>
          <div className="users">
            <div>
              Users <i className="fas fa-users"></i>
            </div>
            <ul className="users-list">
              {members.map((member, index) => {
                return (
                  <li className="user" key={index}>
                    <div>{member.name}</div>
                    <button
                      className="btn"
                      type="button"
                      aria-label="Add friend"
                    >
                      <i className="fas fa-user-plus"></i>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      );
    }
  };

  return (
    <div id="home" className="container-fluid">
      <div className="my-chatrooms">
        <h1 className="title">My chatrooms</h1>
        <ul className="flex-chatrooms">{renderChatrooms()}</ul>
        <div className="flex-info">{renderInfo()}</div>
      </div>
    </div>
  );
}

export default Home;
