import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import dateFormat from "dateformat";
import { useParams } from "react-router";

import "./Chatbox.scss";

function Chatbox(props) {
  let { id } = useParams();
  const [state, setState] = useState({ message: "", chatroomId: id });
  const [currentUser, setCurrentUser] = useState(null);
  const [chat, setChat] = useState([]);

  const { notify } = props;
  const scrollDown = useRef();
  const socketRef = useRef();

  useEffect(() => {
    getMessages();

    socketRef.current = io.connect("http://localhost:8000", {
      transports: ["websocket"],
    });

    socketRef.current.on("message", (sended) => {
      if (sended) {
        getMessages();
      }
    });
    return () => socketRef.current.disconnect();

    // eslint-disable-next-line
  }, []);

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

  const onMessageSubmit = async (e) => {
    e.preventDefault();
    socketRef.current.emit("message", { sended: true });

    try {
      await axios({
        url: "/message/create",
        method: "POST",
        data: state,
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      });

      getMessages();
    } catch (error) {
      notify(error.response.data);
    }

    setState({ ...state, message: "" });
  };

  const getMessages = async () => {
    await axios({
      url: "/message/" + id,
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setCurrentUser(res.data.currentUser.name);
        setChat(res.data.messages);
        chatScrollToDown();
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
    let prevName = "";
    return chat.map((message, index) => {
      const result =
        prevName === message.senderId.name ? (
          <div
            key={index}
            className={
              message.senderId.name === currentUser
                ? "message message--left message--merged"
                : "message message--right message--merged"
            }
          >
            <div className="message__body">
              <span className="message__body__time">
                {dateFormat(message.createdAt, "h:MM TT")}
              </span>
              <div className="message__body__inner">{message.body}</div>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className={
              message.senderId.name === currentUser
                ? "message message--left"
                : "message message--right"
            }
          >
            <div className="message__sender">{message.senderId.name}</div>
            <div className="message__body">
              <span className="message__body__time">
                {dateFormat(message.createdAt, "h:MM TT")}
              </span>
              <div className="message__body__inner">{message.body}</div>
            </div>
          </div>
        );
      prevName = message.senderId.name;
      return result;
    });
  };

  return (
    <div className="chatbox container-fluid">
      <div className="chatbox__messages" onScroll={() => showScrollDownBtn()}>
        {renderChat()}
      </div>
      <form className="chatbox__form" onSubmit={onMessageSubmit}>
        <input
          name="message"
          className="form-control"
          onChange={(e) => onTextChange(e)}
          value={state.message}
          placeholder="Message..."
          autoComplete="off"
        />
        <button className="btn btn-primary">
          <i className="fas fa-paper-plane"></i>
        </button>
        <a
          ref={scrollDown}
          href="/#"
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
  );
}

export default Chatbox;
