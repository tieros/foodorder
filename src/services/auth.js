import { auth } from "../Firebase/firebase-config";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { bool } from 'yup';
import { authActions } from "../store/slices/index";
import { useDispatch } from "react-redux";

const AuthService = () => {

const dispatch = useDispatch();


   const registerHandler = async (email, password) => {
           try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            dispatch(authActions.setIsLoggedIn(true));
            dispatch(authActions.setUserInfo(user))
        } catch (error) {
            console.log(error);
        }
}
    const loginHandler = async (username, password) => {
        try {
            const user = await signInWithEmailAndPassword(auth, username, password);
            dispatch(authActions.setIsLoggedIn(true));
            dispatch(authActions.setUserInfo(user));
        } catch (error) {
            const errorCode = error.code.split('auth/')[1];
            dispatch(authActions.setErrorMessage(errorCode));
            dispatch(authActions.setHasError(true))
        }
    };

        const logoutHandler = async () => {
            await signOut(auth);
            dispatch(authActions.setIsLoggedIn(false));
            dispatch(authActions.setUserInfo(null));
        };

           onAuthStateChanged(auth, (currentUser) => {
               dispatch(authActions.setUserInfo(currentUser));
               if (currentUser) {
                   dispatch(authActions.setIsLoggedIn(true));
               } else dispatch(authActions.setIsLoggedIn(false));
           });
};
export default AuthService;


