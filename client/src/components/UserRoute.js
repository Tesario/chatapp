import { Route, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const UserRoute = ({ component: Component, notify, ...rest }) => {
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      isAuthFunc();
    }
    return () => (mounted = false);
  });

  const isAuthFunc = async () => {
    await axios({
      url: "/user/is-auth",
      method: "GET",
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    }).catch(() => {
      history.push("/");
    });
  };

  return (
    <Route
      {...rest}
      render={(props) => <Component notify={notify} {...props} />}
    />
  );
};

export default UserRoute;
