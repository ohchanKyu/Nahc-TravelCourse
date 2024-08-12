import React from "react";

const authContext = React.createContext({
    accessToken : '',
    grantType : '',
    refreshToken : '',
    accessTokenExpiresIn : 0,
    setUserToken : (grantType,accessToken,refreshToken,accessTokenExpiresIn) => {},
    removeUserToken : () => {},
});

export default authContext;