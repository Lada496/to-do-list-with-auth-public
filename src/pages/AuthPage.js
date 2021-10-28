import { Fragment } from "react";
import { Link, useRouteMatch, Route, Switch } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
const AuthPage = () => {
  const match = useRouteMatch();
  return (
    <Fragment>
      <h1>To-do list</h1>
      <Switch>
        <Route path={match.url} exact>
          <div className="auth">
            <button className="auth__btn">
              <Link to={`${match.url}/login`}>Login</Link>
            </button>
            <button className="auth__btn">
              <Link to={`${match.url}/signup`}>Sign Up</Link>
            </button>
          </div>
        </Route>
        <Route path={`${match.url}/login`}>
          <Login />
        </Route>
        <Route path={`${match.url}/signup`}>
          <Signup />
        </Route>
      </Switch>
    </Fragment>
  );
};
export default AuthPage;
