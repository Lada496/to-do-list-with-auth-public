import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <Switch>
      {isLogin && (
        <Route path="/home" exact>
          <Home />
        </Route>
      )}

      {!isLogin && (
        <Route path="/auth">
          <AuthPage />
        </Route>
      )}

      <Route path="*">
        {isLogin && <Redirect to="/home" />}
        {!isLogin && <Redirect to="/auth" />}
      </Route>
    </Switch>
  );
}

export default App;
