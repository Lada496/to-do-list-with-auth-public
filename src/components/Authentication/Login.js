import { Fragment, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { authActions } from "../../store/auth-slice";
const Login = () => {
  const dispatch = useDispatch();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const [error, setError] = useState("");
  const history = useHistory();
  const auth = getAuth();
  const loginHandler = (event) => {
    event.preventDefault();
    const email = inputEmailRef.current.value;
    const password = inputPasswordRef.current.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch(authActions.login(user.uid));
        history.replace("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  return (
    <Fragment>
      <h2>Login</h2>
      {error && <p className="error__message">{error}</p>}
      <form className="auth__form" onSubmit={loginHandler}>
        <label htmlFor="email">Email</label>
        <input
          className="valid"
          type="email"
          id="email"
          name="email"
          ref={inputEmailRef}
        />
        <label htmlFor="password">Password</label>
        <input
          className="valid"
          type="password"
          name="password"
          ref={inputPasswordRef}
        />
        <button type="submit">Login</button>
      </form>
    </Fragment>
  );
};
export default Login;
