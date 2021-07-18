import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "./components/Register";
import Chatbox from "./components/Chatbox";
import Login from "./components/Login";
import Info from "./components/Info";
import Settings from "./components/Settings";
import CreateChatroom from "./components/CreateChatroom";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

import UserRoute from "./components/UserRoute";

import "./assets/css/global.scss";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const notify = (data) => {
  const { success, message, isShow } = data;
  if (isShow) {
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
  useEffect(() => {
    const root = document.documentElement;

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
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <UserRoute path="/chatroom/:id" component={Chatbox} notify={notify} />
          <Route path="/login">
            <Login notify={notify} />
          </Route>
          <Route path="/register">
            <Register notify={notify} />
          </Route>
          <UserRoute exact path="/" component={Home} notify={notify} />
          <UserRoute
            path="/create"
            component={CreateChatroom}
            notify={notify}
          />
          <UserRoute path="/settings" component={Settings} />
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/forbidden">
            <Forbidden />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Sidebar notify={notify} />
      </div>
    </Router>
  );
}

export default App;
