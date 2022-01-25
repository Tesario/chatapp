import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Register from "./components/Register";
import Chatroom from "./components/Chatroom";
import DirectChatroom from "./components/DirectChatroom";
import Login from "./components/Login";
import Settings from "./components/Settings";
import CreateChatroom from "./components/CreateChatroom";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import io from "socket.io-client";
import UserRoute from "./components/UserRoute";

import "./assets/css/global.scss";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./components/Homepage";

toast.configure();
const notify = (data) => {
  const { success, message, isShow } = data;
  if (isShow || isShow === undefined) {
    if (success) {
      toast.success(message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
    } else {
      toast.error(message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
    }
  }
};

function App() {
  const socketRef = useRef();
  const [isHomepage, setIsHomepage] = useState(true);
  const [isAuth, setIsAuth] = useState("");

  useEffect(() => {
    let mounted = true;
    const root = document.documentElement;

    if (mounted) {
      isAuthFunc();
    }

    if (localStorage.getItem("primary-color")) {
      root.style.setProperty(
        "--primary-color",
        localStorage.getItem("primary-color")
      );
    }
    if (localStorage.getItem("secondary-color")) {
      root.style.setProperty(
        "--secondary-color",
        localStorage.getItem("secondary-color")
      );
    }
    if (localStorage.getItem("text-color")) {
      root.style.setProperty(
        "--text-color",
        localStorage.getItem("text-color")
      );
    }

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    socketRef.current = io.connect("https://tesar-chatapp.herokuapp.com", {
      transports: ["websocket"],
    });

    if (mounted) {
      socketRef.current.on("connect", async () => {
        if (isAuth) {
          await axios({
            url: "https://tesar-chatapp.herokuapp.com/user/status/true",
            method: "PUT",
            headers: {
              authorization: sessionStorage.getItem("token"),
            },
          });
        }
      });

      if (isAuth) {
        window.onbeforeunload = async () => {
          await axios({
            url: "https://tesar-chatapp.herokuapp.com/user/status/false",
            method: "PUT",
            headers: {
              authorization: sessionStorage.getItem("token"),
            },
          });
        };
      }
    }
    return () => (mounted = false);
  }, [isAuth]);

  const changeIsAuth = (value) => {
    setIsAuth(value);
  };

  const changeIsHomepage = (value) => {
    setIsHomepage(value);
  };

  const isAuthFunc = async () => {
    await axios({
      url: "https://tesar-chatapp.herokuapp.com/user/is-auth",
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then(() => {
        setIsAuth(true);
      })
      .catch(() => {
        sessionStorage.removeItem("token");
        setIsAuth(false);
      });
  };

  return (
    <div className="app">
      <Router>
        {!isHomepage || isAuth ? (
          <Navbar notify={notify} changeIsAuth={changeIsAuth} isAuth={isAuth} />
        ) : null}
        <Switch>
          <UserRoute
            path="/chatroom/:lowerCaseName"
            component={Chatroom}
            notify={notify}
          />
          <UserRoute
            path="/direct-chatroom/:name"
            component={DirectChatroom}
            notify={notify}
          />
          <Route path="/login">
            <Login
              changeIsAuth={changeIsAuth}
              changeIsHomepage={changeIsHomepage}
              notify={notify}
            />
          </Route>
          <Route path="/register">
            <Register
              notify={notify}
              changeIsHomepage={changeIsHomepage}
              changeIsAuth={changeIsAuth}
            />
          </Route>
          {isAuth ? (
            <UserRoute exact path="/" component={Home} notify={notify} />
          ) : (
            <Route exact path="/">
              <Homepage changeIsHomepage={changeIsHomepage} notify={notify} />
            </Route>
          )}
          <UserRoute
            path="/create"
            component={CreateChatroom}
            notify={notify}
          />
          <UserRoute path="/settings" component={Settings} notify={notify} />
          <Route path="/forbidden">
            <Forbidden changeIsHomepage={changeIsHomepage} />
          </Route>
          <Route path="*">
            <NotFound changeIsHomepage={changeIsHomepage} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
