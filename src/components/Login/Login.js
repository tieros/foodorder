import Card from "../UI/Card";
import Modal from "../UI/Modal";
import { useRef, useState,  useEffect } from "react";
import style from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/slices";
import AuthService from "../../services/auth";

export default function Login(props) {
  const [loginMode, setLoginMode] = useState(true);
  const [redirectProfile, setRedirectProfile] = useState(null);

  const hasError = useSelector(state => state.auth.hasError);
  const errorMessage = useSelector(state=> state.auth.errorMessage)

  const dispatch = useDispatch()

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (hasError === false) {
      props.onCloseLogin();
    }
    return () => {
      dispatch(authActions.setHasError(null))
    };
  }, [hasError, props, dispatch]);

  async function loginHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (loginMode) {
      AuthService.loginHandler(enteredEmail, enteredPassword);
    } else if (!loginMode) {
      AuthService.registerHandler(enteredEmail, enteredPassword);
      setRedirectProfile(true);
    }
  }

  const switchAuthModeHandler = () => {
    setLoginMode((prevState) => !prevState);
  };

  return (
    <Modal onClose={props.onCloseLogin}>
      <Card>
        {redirectProfile === null && (
          <>
            <h1>{loginMode ? "Login" : "Sign Up"}</h1>
            <div>
              <input type="text" placeholder="Username" ref={emailRef} />
            </div>
            <div>
              <input type="password" placeholder="Password" ref={passwordRef} />
            </div>
            <button onClick={loginHandler}>Submit</button>
            {hasError === true && <p>{errorMessage}</p>}
            <button
              type="button"
              className={style.toggle}
              onClick={switchAuthModeHandler}
            >
              {loginMode ? "Create new account" : "Login with existing account"}
            </button>
          </>
        )}
      </Card>
    </Modal>
  );
}
