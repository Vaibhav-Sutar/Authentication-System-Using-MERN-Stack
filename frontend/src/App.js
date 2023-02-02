import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import Login from "./component/User/Login";
import ProProfile from "./component/User/ProProfile";
import ProUpdateProfile from "./component/User/ProUpdateProfile";
import ProUpdatePassword from "./component/User/ProUpdatePassword";
import ProForgotPassword from "./component/User/ProForgotPassword";
import ProResetPassword from "./component/User/ProResetPassword";
import Register from "./component/User/Register";

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "sans-serif", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>



      <Switch>
        <Route exact path="/" component={Register} />

        <ProtectedRoute exact path="/account" component={ProProfile} />

        <ProtectedRoute exact path="/me/update" component={ProUpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={ProUpdatePassword}
        />

        <Route exact path="/password/forgot" component={ProForgotPassword} />

        <Route exact path="/password/reset/:token" component={ProResetPassword} />

        <Route exact path="/login" component={Login} />


        

      </Switch>

    </Router>
  );
}

export default App;
