import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import dateFormat from "dateformat";
import { useParams } from "react-router";

import "./Chatbox.scss";

function Chatbox(props) {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const { notify } = props;
  const scrollDown = useRef();
  const socketRef = useRef();
  let { id } = useParams();

  useEffect(() => {
    getMessages();

    axios({
      url: "/user/isUserAuth",
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        setState({
          ...state,
          name: response.data.user.name,
        });
      })
      .catch(() => {
        notify("Login failed!");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8000/", {
      transports: ["websocket"],
    });

    socketRef.current.on("message", ({ name, message }) => {
      const chatCopy = [...chat.messages];
      chatCopy.push({
        sender: name,
        body: message,
        date: Date.now(),
      });
      const final = { ...chat, messages: chatCopy };
      setChat({ ...final });
    });
    chatScrollToDown();

    return () => socketRef.current.disconnect();
  }, [chat]);

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

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (state.name && state.message) {
      socketRef.current.emit("message", state);

      axios({
        url: "/chatroom/saveMessage/" + id,
        method: "PATCH",
        data: { ...state },
      })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((err) => {
          console.log(err.message);
        });

      setState({ ...state, message: "" });
    }
  };

  const getMessages = () => {
    axios.get("/chatroom/find/" + id).then((response) => {
      const data = response.data;
      if (data.message) {
        notify({ message: "Chatroom connection failed!" });
        return;
      }
      setChat(...data);
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
    if (chat.messages === undefined) return;
    let prevName = "";
    return chat.messages.map((message, index) => {
      const result =
        prevName === message.sender ? (
          <div
            key={index}
            className={
              message.sender === state.name
                ? "message message--left message--merged"
                : "message message--right message--merged"
            }
          >
            <div className="message__body">
              <span className="message__body__time">
                {dateFormat(message.date, "h:MM TT")}
              </span>
              <div className="message__body__inner">{message.body}</div>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className={
              message.sender === state.name
                ? "message message--left"
                : "message message--right"
            }
          >
            <div className="message__sender">{message.sender}</div>
            <div className="message__body">
              <span className="message__body__time">
                {dateFormat(message.date, "h:MM TT")}
              </span>
              <div className="message__body__inner">{message.body}</div>
            </div>
          </div>
        );
      prevName = message.sender;
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
