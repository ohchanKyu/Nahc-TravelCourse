import React, { useReducer } from "react";
import loginContext from './login-context';

const defaultLoginUser = {
    id : 0,
    name : '',
    email : '',
    password : '',
}

const loginReducer = (state,action) => {

    if (action.type === "LOGIN"){
        return {
            ...state,
            id : action.id,
            name : action.name,
            email : action.email,
            password : action.password
        }
    }
    if (action.type === 'EDITNAME'){
        return {
            ...state,
            name : action.newName
        }
    }
    if (action.type === "EDITEMAIL"){
        return {
            ...state,
            email : action.newEmail
        }
    }
    if (action.type === 'EDITPASSWORD'){
        return {
            ...state,
            password : action.newPassword
        }
    }
    if (action.type === "LOGOUT"){
        return defaultLoginUser;
    }
    return defaultLoginUser;
}

const LoginProvider = (props) => {

    const [userState,dispatchUserAction] = useReducer(loginReducer,defaultLoginUser);

    const loginHandler = (id,name,email,password) => {
        dispatchUserAction({
            type : 'LOGIN',
            id : id,
            name : name,
            email : email,
            password : password
        })
    };

    const editNameHandler = (newName) => {
        dispatchUserAction({
            type : 'EDITNAME',
            newName
        })
    }

    const editEmailHandler = (newEmail) => {
        dispatchUserAction({
            type : "EDITEMAIL",
            newEmail
        })
    }

    const editPasswordHandler = (newPassword) => {
        dispatchUserAction({
            type : "EDITPASSWORD",
            newPassword
        })
    }

    const logoutHandler = (email,password) => {
        dispatchUserAction({
            type : 'LOGOUT',
            email : email,
            password : password
        })
    };

    const userContext = {
        id : userState.id,
        name : userState.name,
        email : userState.email,
        password : userState.password,
        loginUser : loginHandler,
        logoutUser : logoutHandler,
        editNameUser : editNameHandler,
        editEmailUser : editEmailHandler,
        editPasswordUser : editPasswordHandler
    }

    return (
        <loginContext.Provider value={userContext}>
            {props.children}
        </loginContext.Provider>
    );
}

export default LoginProvider;