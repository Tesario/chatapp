import React, { useEffect } from "react";
import Chatbox from "./Chatbox";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "./Register";
import Login from "./Login";
import Info from "./Info";
import Settings from "./Settings";
import CreateChatroom from "./CreateChatroom";
import Forbidden from "./Forbidden";
import NotFound from "./NotFound";
import Sidebar from "./Sidebar";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const notify = (data) => {
  switch (data.status) {
    case "success":
      toast.success(data.message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      break;

    default:
      toast.error(data.message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      break;
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
          <Route path="/chatroom/:id">
            <Chatbox notify={notify} />
          </Route>
          <Route path="/login">
            <Login notify={notify} />
          </Route>
          <Route path="/register">
            <Register notify={notify} />
          </Route>
          <Route path="/create">
            <CreateChatroom notify={notify} />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
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
        <Sidebar />
      </div>
    </Router>
  );
}

export default App;
