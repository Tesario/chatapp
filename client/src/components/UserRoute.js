import { Redirect, Route } from "react-router-dom";

const UserRoute = ({ component: Component, notify, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        sessionStorage.getItem("token") ? (
          <Component notify={notify} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default UserRoute;
