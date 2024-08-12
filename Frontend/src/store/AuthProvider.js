import React, { useReducer } from "react";
import authContext from "./auth-context";

const defaultUserToken = {
    accessToken : '',
    grantType : '',
    refreshToken : '',
    accessTokenExpiresIn : 0,
}

const setUserTokenReducer = (state,action) => {

    if (action.type === "SET"){
        return {
            ...state,
            accessToken : action.accessToken,
            grantType : action.grantType,
            refreshToken : action.refreshToken,
            accessTokenExpiresIn : action.accessTokenExpiresIn
        }
    }
    if (action.type === "REMOVE"){
        return defaultUserToken;
    }
    return defaultUserToken;
}

const AuthProvider = (props) => {

    const [tokenState,dispatchTokenAction] = useReducer(setUserTokenReducer,defaultUserToken);
 
    const setTokenHandler = (grantType,accessToken,refreshToken,accessTokenExpiresIn) => {
        dispatchTokenAction({
            type : 'SET',
            grantType,accessToken,refreshToken,accessTokenExpiresIn
        })
    };

    const getTokenHandler = () => {
        dispatchTokenAction({
            type : 'GET',
        })
    }

    const removeTokenHandler = () => {
        dispatchTokenAction({
            type : 'REMOVE',
        })
    };

    const tokenContext = {
        accessToken : tokenState.accessToken,
        grantType : tokenState.grantType,
        refreshToken : tokenState.refreshToken,
        accessTokenExpiresIn : tokenState.accessTokenExpiresIn,
        setUserToken : setTokenHandler,
        removeUserToken : removeTokenHandler,
        getUserToken : getTokenHandler,
    }

    return (
        <authContext.Provider value={tokenContext}>
            {props.children}
        </authContext.Provider>
    );
}

export default AuthProvider;