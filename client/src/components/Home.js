import React, { useEffect, useState, useRef } from "react";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Home.scss";

function Home(props) {
  const { notify } = props;
  const [chatrooms, setChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [search, setSearch] = useState("");
  const searchInput = useRef();

  useEffect(() => {
    getChatrooms();
    getFriendRequests();
    getFriends();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getFoundUsers();
    // eslint-disable-next-line
  }, [search]);

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
        setCurrentUser(res.data.user);
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const getFriendRequests = async () => {
    await axios({
      url: "/friend-request/get",
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setFriendRequests(res.data);
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const getFriends = async () => {
    await axios({
      url: "/direct-chatroom/get",
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setFriends(res.data.friends);
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const getFoundUsers = async () => {
    await axios({
      url: "/user/search/" + search,
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setFoundUsers(res.data);
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

  const handleSearch = async (name) => {
    setSearch(name);
  };

  const handleFriendRequest = async (receiverName) => {
    await axios({
      method: "POST",
      url: "friend-request/create",
      data: {
        receiverName,
      },

      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        notify(res.data);
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const handleDeleteRequest = async (requestId) => {
    await axios({
      url: "/friend-request/delete",
      method: "DELETE",
      data: {
        requestId,
      },
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        notify(res.data);
        getFriendRequests();
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const handleAcceptRequest = async (requestId, senderId) => {
    await axios({
      url: "/friend-request/accept",
      method: "POST",
      data: {
        requestId,
        senderId,
      },
      headers: { authorization: sessionStorage.getItem("token") },
    })
      .then((res) => {
        notify(res.data);
        getFriendRequests();
        getFriends();
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const handleRemoveFriend = async (name) => {
    await axios({
      url: "/direct-chatroom/" + name + "/remove",
      method: "DELETE",
      headers: { authorization: sessionStorage.getItem("token") },
    })
      .then((res) => {
        notify(res.data);
        getFriends();
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const renderChatrooms = () => {
    if (chatrooms.length) {
      return chatrooms.map((chatroom, index) => {
        const { name, isPrivate } = chatroom;

        return (
          <div className="accordion-item" key={index}>
            <div className="accordion-header flex-item" id={"heading" + name}>
              <Link className="link" to={"/chatroom/" + name}>
                <div className="name"> {name}</div>
                <div className="private">
                  {isPrivate ? (
                    <i className="fas fa-lock"></i>
                  ) : (
                    <i className="fas fa-lock-open"></i>
                  )}
                </div>
              </Link>
              <button
                className="btn accordion-btn collapsed"
                type="button"
                aria-label="Info button"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse" + name}
                aria-expanded="false"
                aria-controls={"collapse" + name}
                onClick={() => {
                  setCurrentChatroom(chatroom);
                }}
              >
                <i className="fas fa-chevron-down"></i>
              </button>
              <button
                type="button"
                className="btn leave"
                aria-label="Leave chatroom"
                onClick={() => handleLeave(chatroom.name)}
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
            <div
              id={"collapse" + chatroom.name}
              className="accordion-collapse collapse"
              aria-labelledby={"heading" + chatroom.name}
              data-bs-parent="#accordionChatrooms"
            >
              <div className="accordion-body"> {renderInfo()}</div>
            </div>
          </div>
        );
      });
    }

    return <div className="desc darken">No chatrooms found</div>;
  };

  const renderInfo = () => {
    if (currentChatroom) {
      const { members } = currentChatroom;

      return (
        <>
          <div className="users">
            <div>{members.length} Members:</div>
            <ul className="users-list">
              {members.map((member, index) => {
                return (
                  <li className="user" key={index}>
                    <div> {member.name}</div>
                    {currentUser !== member.name ? (
                      <button
                        className="btn"
                        type="button"
                        aria-label="Find friend"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => {
                          handleSearch(member.name);
                          searchInput.current.value = member.name;
                        }}
                      >
                        <i className="fas fa-search"></i>
                      </button>
                    ) : (
                      <div>You</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      );
    }
  };

  const renderFriendRequests = () => {
    if (friendRequests.length) {
      return friendRequests.map((friendRequest, index) => {
        return (
          <div key={index} className="friend-request">
            <div className="date">
              {dateFormat(friendRequest.createdAt, "hh:MM TT, dd. mm. yyyy")}
            </div>
            <div className="name"> {friendRequest.senderId.name}</div>
            <div className="buttons">
              <button
                type="button"
                className="btn add"
                onClick={() =>
                  handleAcceptRequest(
                    friendRequest._id,
                    friendRequest.senderId._id
                  )
                }
              >
                <i className="fas fa-check"></i>
              </button>
              <button
                type="button"
                className="btn cancel"
                aria-label="Cancel"
                onClick={() => handleDeleteRequest(friendRequest._id)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        );
      });
    }
    return <div className="desc darken">No friend requests found</div>;
  };

  const renderFriends = () => {
    if (friends.length) {
      return friends.map((friend, index) => {
        return (
          <div key={index} className="friend">
            <Link to={"direct-chatroom/" + friend.name} className="name">
              {friend.members[0].name === currentUser
                ? friend.members[1].name
                : friend.members[0].name}
            </Link>
            <button
              type="button"
              className="btn cancel"
              aria-label="Cancel"
              onClick={() => handleRemoveFriend(friend.name)}
            >
              <i className="fas fa-user-minus"></i>
            </button>
          </div>
        );
      });
    }
    return <div className="desc darken">No friends found</div>;
  };

  const renderActionButton = (action, user) => {
    switch (action) {
      case "not-friends":
        return (
          <button
            type="button"
            className="btn add"
            onClick={() => handleFriendRequest(user.name)}
          >
            <i className="fas fa-user-plus"></i>
          </button>
        );
      case "friends":
        return (
          <button
            type="button"
            className="btn cancel"
            aria-label="Remove friend"
            onClick={() => {
              handleRemoveFriend(user.name);
              getFoundUsers();
            }}
          >
            <i className="fas fa-user-minus"></i>
          </button>
        );
      default:
        return "You";
    }
  };

  const renderFoundUsers = () => {
    if (foundUsers.length) {
      return foundUsers.map((item, index) => {
        return (
          <div key={index} className="user">
            <div className="name">{item.user.name}</div>
            {renderActionButton(item.action, item.user)}
          </div>
        );
      });
    }
    return <div className="desc darken">No users found</div>;
  };

  return (
    <>
      <div id="home" className="container-fluid">
        <div className="my-chatrooms">
          <h1 className="title">My chatrooms</h1>
          <div className="desc">Avalible chatrooms:</div>
          <div className="flex-chatrooms accordion" id="accordionChatrooms">
            {renderChatrooms()}
          </div>
        </div>
        <div className="friends">
          <h1 className="title">Friends</h1>
          <div className="desc">Friend requests:</div>
          <div className="friend-requests">{renderFriendRequests()}</div>
          <button
            type="button"
            className="btn btn-primary find"
            aria-label="Find friends"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Find friends <i className="fas fa-search"></i>
          </button>
          <div className="desc">My friends:</div>
          <div className="friend-list">{renderFriends()}</div>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="searchModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title" id="searchModalLabel">
                Find friends
              </div>
              <button
                type="button"
                className="btn close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  autoComplete="off"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Write friend name..."
                  ref={searchInput}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <label htmlFor="floatingInput">Write friend name...</label>
              </div>
              <div className="grid-found-users">{renderFoundUsers()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
