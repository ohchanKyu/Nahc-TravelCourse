import React from "react";

const loginContext = React.createContext({
    id : 0,
    name : '',
    email : '',
    password : '',
    loginUser : (email,password) => {},
    logoutUser : (email,password) => {},
    editNameUser : (newName) => {},
    editEmailUser : (newEmail) => {},
    editPasswordUser : (newPassword) => {}
});

export default loginContext;