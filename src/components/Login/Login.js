import Card from "../UI/Card";
import Modal from "../UI/Modal";
import { useRef, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import style from "./Login.module.css";
import FormikForm from "../Profile/FormikForm";

export default function Login(props) {
  const [loginMode, setLoginMode] = useState(true);
  const [redirectProfile, setRedirectProfile] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const authCtx = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (authCtx.hasError === false) {
      props.onCloseLogin();
    }
    return () => {
      authCtx.setHasError(null);
    };
  }, [authCtx, authCtx.hasError, props]);

  async function loginHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (loginMode) {
      authCtx.login(enteredEmail, enteredPassword);
    } else if (!loginMode) {
      authCtx.register(enteredEmail, enteredPassword);
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
            {authCtx.hasError === true && <p>{authCtx.errorMessage}</p>}
            <button
              type="button"
              className={style.toggle}
              onClick={switchAuthModeHandler}
            >
              {loginMode ? "Create new account" : "Login with existing account"}
            </button>
          </>
        )}
        {redirectProfile && <FormikForm onClose={props.onCloseLogin} />}
      </Card>
    </Modal>
  );
}
