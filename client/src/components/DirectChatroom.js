import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import dateFormat from "dateformat";
import { useParams } from "react-router";

import "./DirectChatroom.scss";

function DirectChatroom(props) {
  let { name } = useParams();
  const [state, setState] = useState({ message: "", chatroomName: name });
  const [currentUser, setCurrentUser] = useState(null);
  const [chat, setChat] = useState([]);
  const [messagesCount, setMessagesCount] = useState(50);
  const [moreMessages, setMoreMessages] = useState(false);

  const { notify } = props;
  const scrollDown = useRef();
  const socketRef = useRef();

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, [messagesCount]);

  useEffect(() => {
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
    socketRef.current.emit("joinRoom", name);
    // eslint-disable-next-line
  }, []);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const chatScrollToDown = () => {
    const lastMessage = document.querySelector(
      ".direct-chatbox__messages .message:last-child"
    );

    if (lastMessage) {
      lastMessage.scrollIntoView();
      document.querySelector(".direct-chatbox__messages").style.scrollBehavior =
        "smooth";
    }
  };

  const handleMessagesCount = () => {
    setMessagesCount(messagesCount * 1 + 50);
  };

  const onMessageSubmit = async (e) => {
    e.preventDefault();

    await axios({
      url: "/message/direct-chatroom/" + name + "/create",
      method: "POST",
      data: state,
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then(() => {
        socketRef.current.emit("message", { sended: true, room: name });
      })
      .catch((error) => {
        notify(error.response.data);
      });
    setState({ ...state, message: "" });
  };

  const getMessages = async () => {
    await axios({
      url: "/message/direct-chatroom/" + name + "/" + messagesCount,
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setCurrentUser(res.data.currentUser.name);
        setChat(res.data.messages);
        setMoreMessages(res.data.moreMessages);
        chatScrollToDown();
      })
      .catch((error) => {
        notify(error.response.data);
      });
  };

  const showScrollDownBtn = () => {
    const chatboxMessages = document.querySelector(".direct-chatbox__messages");
    if (
      chatboxMessages.scrollHeight -
        (chatboxMessages.scrollTop + chatboxMessages.offsetHeight) >
      200
    ) {
      scrollDown.current.classList.add(
        "direct-chatbox__form__scroll-down--scrolling"
      );
    } else {
      scrollDown.current.classList.remove(
        "direct-chatbox__form__scroll-down--scrolling"
      );
    }
  };

  const renderChat = () => {
    if (chat === []) return;
    let prevName = "";
    return chat.map((message, index) => {
      const actualUser = prevName !== message.senderId.name;
      const result = (
        <div
          key={index}
          className={
            "message " +
            (message.senderId.name === currentUser
              ? "message--left"
              : "message--right") +
            (!actualUser ? " message--merged" : "")
          }
        >
          {actualUser ? (
            <div className="message__sender">{message.senderId.name}</div>
          ) : (
            ""
          )}
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
    <div className="direct-chatbox container-fluid">
      <div
        className="direct-chatbox__messages"
        onScroll={() => showScrollDownBtn()}
      >
        {moreMessages ? (
          <button
            className="btn more-messages"
            aria-label="Show more messages"
            onClick={() => handleMessagesCount()}
          >
            <i className="fas fa-plus"></i>
          </button>
        ) : (
          ""
        )}
        {renderChat()}
      </div>
      <form className="direct-chatbox__form" onSubmit={onMessageSubmit}>
        <input
          name="message"
          className="form-control"
          onChange={(e) => onTextChange(e)}
          value={state.message}
          placeholder="Message..."
          autoComplete="off"
        />
        <button className="btn btn-primary" aria-label="Send message">
          <i className="fas fa-paper-plane"></i>
        </button>
        <a
          ref={scrollDown}
          href="/#"
          aria-label="Scroll to down"
          className="direct-chatroom__form__scroll-down btn btn-primary"
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

export default DirectChatroom;
