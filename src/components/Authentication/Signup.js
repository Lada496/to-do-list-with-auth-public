import { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { authActions } from "../../store/auth-slice";
import useInput from "../../hooks/use-input";
const Signup = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const history = useHistory();
  const [formIsVaild, setFormIsValid] = useState(false);
  const [error, setError] = useState("");
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));
  const {
    value: enteredPassword1,
    isValid: enteredPassword1IsValid,
    hasError: password1InputHasError,
    valueChangeHandler: password1InputChangeHandler,
    inputBlurHandler: password1BlurHandler,
    reset: resetPassword1Input,
  } = useInput((value) => value.length >= 6);

  const {
    value: enteredPassword2,
    isValid: enteredPassword2IsValid,
    hasError: password2InputHasError,
    valueChangeHandler: password2InputChangeHandler,
    inputBlurHandler: password2BlurHandler,
    reset: resetPassword2Input,
  } = useInput((value) => value === enteredPassword1);

  useEffect(() => {
    if (
      enteredEmailIsValid &&
      enteredPassword1IsValid &&
      enteredPassword2IsValid
    ) {
      setFormIsValid(true);
    }
  }, [enteredEmailIsValid, enteredPassword1IsValid, enteredPassword2IsValid]);

  const signupHandler = (event) => {
    event.preventDefault();
    console.log("submit");
    const email = enteredEmail;
    const password = enteredPassword1;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resetEmailInput();
        resetPassword1Input();
        resetPassword2Input();
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
      <h2>Sign up</h2>
      {error && <p className="error__message">{error}</p>}
      <form className="auth__form" onSubmit={signupHandler}>
        <label htmlFor="email">Email</label>
        <input
          className={emailInputHasError ? "invalid" : "valid"}
          type="email"
          id="email"
          name="email"
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <p className="error__text">Please enter a valid email</p>
        )}
        <label htmlFor="password1">Password</label>
        <input
          className={password1InputHasError ? "invalid" : "valid"}
          type="password"
          name="password1"
          value={enteredPassword1}
          onChange={password1InputChangeHandler}
          onBlur={password1BlurHandler}
        />
        {password1InputHasError && (
          <p className="error__text">Password should be at least 6 letters</p>
        )}
        <label htmlFor="password2">Confirm Password</label>
        <input
          className={password2InputHasError ? "invalid" : "valid"}
          type="password"
          name="password2"
          value={enteredPassword2}
          onChange={password2InputChangeHandler}
          onBlur={password2BlurHandler}
        />
        {password2InputHasError && (
          <p className="error__text">
            Your entry is different from the first password entry
          </p>
        )}
        <button disabled={!formIsVaild} type="submit">
          Sign up
        </button>
      </form>
    </Fragment>
  );
};
export default Signup;
