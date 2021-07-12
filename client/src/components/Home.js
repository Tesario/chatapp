import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Home.scss";

function Home(props) {
  const { notify } = props;
  const [chatrooms, setChatrooms] = useState([]);

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
          <li key={index} className="flex-item">
            <Link className="link" to={"/chatroom/" + chatroom._id}>
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

  return (
    <div id="home" className="container-fluid">
      <div className="my-chatrooms">
        <h1 className="title">My chatrooms</h1>
        <ul className="flex-chatrooms">{renderChatrooms()}</ul>
      </div>
    </div>
  );
}

export default Home;
