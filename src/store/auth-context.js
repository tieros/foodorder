import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { bool } from 'yup';

// For autocompletion

export const AuthContext = React.createContext({
    isLoggedIn: '',
    token: '',
    userInfo: '',
    login: () => {},
    logout: () => {},
    register: () => {},
    makeFormValid: () => {},
    canOrder: '',
    errorMessage: '',
    hasError: bool,
});

export default function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [canOrder, setCanOrder] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [hasError, setHasError] = useState(null);

    let errorCode;
    const registerHandler = async (username, password) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, username, password);
            setIsLoggedIn(true);
            setUser(user);
        } catch (err) {
            console.log(err);
        }
    };

    const loginHandler = async (username, password) => {
        try {
            const user = await signInWithEmailAndPassword(auth, username, password);
            setUser(user);
            setIsLoggedIn(true);
            setErrorMessage('');
            setHasError(false);
        } catch (error) {
            errorCode = error.code.split('auth/')[1];
            console.log(errorCode);
            setErrorMessage(errorCode);
            setHasError(true);
        }
    };

    const logoutHandler = async () => {
        await signOut(auth);
        setUser(null);
        setIsLoggedIn(false);
    };

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
            setIsLoggedIn(true);
        } else setIsLoggedIn(false);
    });

    const makeFormValid = (param) => {
        setCanOrder(param);
    };

    const contextValue = {
        isLoggedIn: isLoggedIn,
        userInfo: user,
        token: '',
        errorMessage: errorMessage,
        login: loginHandler,
        logout: logoutHandler,
        register: registerHandler,
        makeFormValid: makeFormValid,
        canOrder: canOrder,
        hasError: hasError,
        setHasError: setHasError,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
}
