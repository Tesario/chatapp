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

import UserRoute from "./UserRoute";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const notify = (data) => {
  if (data.success) {
    toast.success(data.message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 3000,
    });
  } else {
    toast.error(data.message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 3000,
    });
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
        <Sidebar />
      </div>
    </Router>
  );
}

export default App;
