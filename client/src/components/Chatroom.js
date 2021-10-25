import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import dateFormat from "dateformat";
import { useParams } from "react-router";
import "unicode-emoji-picker";

import "./Chatroom.scss";

function Chatroom(props) {
  const { notify } = props;
  let { lowerCaseName } = useParams();
  const [state, setState] = useState({
    message: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [chat, setChat] = useState([]);
  const [messagesCount, setMessagesCount] = useState(100);
  const [moreMessages, setMoreMessages] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [chatroom, setChatroom] = useState({});
  const [files, setFiles] = useState([]);
  const messageInputRef = useRef();
  const scrollDown = useRef();
  const socketRef = useRef();
  const emojiRef = useRef();
  const emojiFillerRef = useRef();

  useEffect(() => {
    getMessages();
    socketRef.current = io.connect("https://tesar-chatapp.herokuapp.com", {
      transports: ["websocket"],
    });

    socketRef.current.on("message", (sended) => {
      if (sended) {
        getMessages();
      }
    });

    return () => socketRef.current.disconnect();

    // eslint-disable-next-line
  }, [socketRef]);

  useEffect(() => {
    getMessages(false);
    // eslint-disable-next-line
  }, [messagesCount]);

  useEffect(() => {
    getChatroom();
    let interval = setInterval(() => {
      getChatroom();
    }, 10000);

    emojiRef.current.setTranslation({
      "face-emotion": {
        emoji: "😀️",
        title: "Emotion",
      },
      "food-drink": {
        emoji: "🥕️",
        title: "Food",
      },
      "animals-nature": {
        emoji: "🦜️",
        title: "Animals",
      },
      "person-people": {
        emoji: "🧍",
        title: "Humans",
      },
      objects: {
        emoji: "👒",
        title: "Clothes",
      },
      symbols: {
        emoji: "💬️",
        title: "Marks",
      },
      flags: {
        emoji: "🚩",
        title: "Pennants",
      },
    });

    emojiRef.current.addEventListener("emoji-pick", (e) => {
      setEmoji(e.detail.emoji);
      messageInputRef.current.focus();
    });

    socketRef.current.emit("joinRoom", lowerCaseName);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setState({ ...state, message: state.message + emoji });
    setEmoji("");
    messageInputRef.current.focus();
    // eslint-disable-next-line
  }, [emoji]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const chatScrollToDown = () => {
    const lastMessage = document.querySelector(
      ".chatbox__messages .message:last-child"
    );

    if (lastMessage) {
      lastMessage.scrollIntoView();
      document.querySelector(".chatbox__messages").style.scrollBehavior =
        "smooth";
    }
  };

  const uploadFiles = (e) => {
    const uploadedFiles = e.target.files;
    let fileArr = [];
    let isValid = true;

    if (uploadedFiles.length > 10) {
      notify({
        success: false,
        message: "Maximum number of files is 10",
        isShow: true,
      });
      e.target.value = "";
      isValid = false;
    }

    for (let i = 0; i < uploadedFiles.length; i++) {
      if (uploadedFiles[i].size > 10000000) {
        notify({
          success: false,
          message: "Maximum size of file is 10MB",
          isShow: true,
        });
        isValid = false;
        break;
      }
    }

    if (isValid) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        fileArr.push(uploadedFiles[i]);
      }

      setFiles(fileArr);
    }
  };

  const handleMessagesCount = () => {
    setMessagesCount(messagesCount * 1 + 100);
  };

  const handleToggleEmoji = (toggle = true) => {
    if (toggle) {
      emojiRef.current.classList.toggle("show");
      emojiFillerRef.current.classList.toggle("show");
      return;
    }

    emojiRef.current.classList.remove("show");
    emojiFillerRef.current.classList.remove("show");
  };

  const onMessageSubmit = async (e) => {
    e.preventDefault();
    handleToggleEmoji(false);

    if (state.message !== "" || files.length !== 0) {
      const formData = new FormData();
      formData.append("lowerCaseName", lowerCaseName);
      formData.append("message", state.message);
      files.forEach((file) => {
        formData.append("files", file);
      });

      await axios({
        url: "/message/" + lowerCaseName + "/create",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: sessionStorage.getItem("token"),
        },
      })
        .then(() => {
          setFiles([]);
          socketRef.current.emit("message", {
            sended: true,
            room: lowerCaseName,
          });
        })
        .catch((error) => {
          notify(error);
        });
      setState({ ...state, message: "" });
    }
  };

  const getChatroom = async () => {
    await axios({
      url: "/chatroom/public/" + lowerCaseName,
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setChatroom(res.data);
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const toggleImage = (e) => {
    e.preventDefault();
    e.target.parentNode.parentNode.classList.toggle("show");
  };

  const getMessages = async (enableScroll = true) => {
    await axios({
      url: "/message/" + lowerCaseName + "/" + messagesCount,
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setCurrentUser(res.data.currentUser.name);
        setChat(res.data.messages);
        setMoreMessages(res.data.moreMessages);
        if (enableScroll) {
          chatScrollToDown();
        }
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const showScrollDownBtn = () => {
    const chatboxMessages = document.querySelector(".chatbox__messages");
    if (
      chatboxMessages.scrollHeight -
        (chatboxMessages.scrollTop + chatboxMessages.offsetHeight) >
      200
    ) {
      scrollDown.current.classList.add("chatbox__form__scroll-down--scrolling");
    } else {
      scrollDown.current.classList.remove(
        "chatbox__form__scroll-down--scrolling"
      );
    }
  };

  const renderChat = () => {
    if (chat === []) return;
    let prevTime = 0;
    let prevName = "";
    return chat.map((message, index) => {
      const isPrevTimeSame =
        prevTime !== dateFormat(message.createdAt, "h:MM TT") ||
        prevName !== message.senderId.name;
      const result = (
        <div
          key={index}
          className={
            "message " +
            (message.senderId.name === currentUser ? "left" : "right") +
            (!isPrevTimeSame ? " merged" : "")
          }
        >
          {isPrevTimeSame ? (
            <div className="header">
              <div className="image">
                <img
                  src={message.senderId.picture}
                  alt={message.senderId.name}
                />
              </div>
              <div className="sender">{message.senderId.name}</div>
              <span className="time">
                {dateFormat(message.createdAt, "h:MM TT")}
              </span>
            </div>
          ) : (
            ""
          )}
          <div className="body">{message.body}</div>
          {message.files.length !== 0 &&
            message.files.map((file, index) => {
              const ext = file.url.split(".")[1];
              return ext === "png" ||
                ext === "jpeg" ||
                ext === "jpg" ||
                ext === "gif" ? (
                <div className="file-image" key={index}>
                  <div className="btn-menu">
                    <a
                      className="btn-download"
                      download={file.url}
                      href={file.url}
                    >
                      <i className="fas fa-download"></i>
                    </a>
                    <a
                      href="/#"
                      onClick={(e) => toggleImage(e)}
                      className="btn-show"
                    >
                      <i className="fas fa-eye"></i>
                    </a>
                    <a
                      className="btn-hide"
                      href="/#"
                      onClick={(e) => toggleImage(e)}
                    >
                      <i className="fas fa-times-circle"></i>
                    </a>
                  </div>
                  <img src={file.url} alt={file.name} />
                </div>
              ) : (
                <a
                  className="file"
                  key={index}
                  download={file.url}
                  href={file.url}
                >
                  <i className="fas fa-download"></i>
                  <div>{file.name}</div>
                </a>
              );
            })}
        </div>
      );
      prevTime = dateFormat(message.createdAt, "h:MM TT");
      prevName = message.senderId.name;
      return result;
    });
  };

  return (
    <div className="chatbox container-fluid">
      <div className="chatbox-grid">
        <ul className="members-dropdown">
          <div className="subtitle without-line name">{chatroom.name}</div>
          {chatroom.members
            ? chatroom.members.map(
                ({ chatroomUser, action, directChatroomName }, index) => {
                  const { picture, name, isOnline } = chatroomUser;
                  return (
                    <li
                      className={
                        "user" + (action === "friends" ? " friend" : "")
                      }
                      key={index}
                    >
                      <div className="avatar">
                        <div className="image">
                          <img src={picture} alt={name} />
                        </div>
                        <span
                          className={
                            "status " + (isOnline ? "online" : "offline")
                          }
                        ></span>
                      </div>
                      <div className="name">{name}</div>
                      {action === "friends" ? (
                        <Link
                          className="btn-chat"
                          to={"/direct-chatroom/" + directChatroomName}
                        >
                          <i className="fas fa-comments"></i>
                        </Link>
                      ) : (
                        ""
                      )}
                    </li>
                  );
                }
              )
            : ""}
        </ul>
        <div className="chatbox__messages" onScroll={() => showScrollDownBtn()}>
          {moreMessages ? (
            <button
              className="btn more-messages"
              aria-label="Show more messages"
              onClick={() => handleMessagesCount()}
            >
              <i className="fas fa-comment-dots"></i>
            </button>
          ) : (
            ""
          )}
          {renderChat()}
        </div>
        <span
          id="emoji-filler"
          ref={emojiFillerRef}
          onClick={handleToggleEmoji}
        ></span>
        <form
          className="chatbox__form"
          onSubmit={(e) => onMessageSubmit(e)}
          encType="multipart/form-data"
        >
          <unicode-emoji-picker ref={emojiRef}></unicode-emoji-picker>
          <input
            name="message"
            className="form-control"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            ref={messageInputRef}
            onClick={() => handleToggleEmoji(false)}
            placeholder="Message..."
            autoComplete="off"
          />
          <button
            type="button"
            className="btn btn-emoji"
            aria-label="Emoji"
            onClick={handleToggleEmoji}
          >
            <i className="far fa-grin-alt"></i>
          </button>
          <button
            type="button"
            className="btn btn-file"
            aria-label="File"
            onClick={() => {
              handleToggleEmoji(false);
              document.querySelector("#files").click();
            }}
          >
            <span>{files.length !== 0 && files.length}</span>
            <i className="far fa-folder-open"></i>
          </button>
          <input
            type="file"
            id="files"
            onChange={uploadFiles}
            multiple="multiple"
          />
          <button className="btn btn-primary" aria-label="Send message">
            <i className="fas fa-paper-plane"></i>
          </button>
          <a
            ref={scrollDown}
            href="/#"
            aria-label="Scroll to down"
            className="chatbox__form__scroll-down btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              chatScrollToDown();
            }}
          >
            <i className="fas fa-angle-double-down"></i>
          </a>
        </form>
      </div>
    </div>
  );
}

export default Chatroom;
