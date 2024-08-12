import axios from "axios";

const apiClient = axios.create(
    {
        baseURL : 'http://localhost:8080/auth'
    }
)

const memberApiClient = axios.create(
    {
        baseURL : 'http://localhost:8080/api/member'
    }
)

export const refreshTokenProcess = (token) => {
    return apiClient.post("/reissue",token);
}

export const login = ({ email, password }) => {

    return apiClient.post('/login',null, {
        params : {
            email : email,
            password : password
        }
    });
}

export const logoutUser = () => {
    return apiClient.post("/logout");
};


export const signUp = (userData) => {
    return apiClient.post('/signup',userData);
}


export const findEmail = (name) => {
    return apiClient.get('/findEmail',{
        params : {
            name : name
        }
    })
}


export const sendEmail = (email) => {
    return apiClient.get('/sendMail',{
        params : {
            email : email
        }
    })
};


export const editPassword = (email,newPassword) => {
    return apiClient.post('/editPassword',null,{
        params : {
            email : email,
            newPassword : newPassword
        }
    })
};


export const editName = ({email, newName, grantType, accessToken}) => {
    return memberApiClient.post('/editName',null,{
        params : {
            email : email,
            newName : newName
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    }) 
}

export const duplicatedEmail = ({ newEmail, grantType, accessToken}) => {
    return memberApiClient.get(`/${newEmail}`,{
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    }) 
}

export const checkPassword = ({ email, password, grantType, accessToken}) => {
    return memberApiClient.get(`/checkPassword`,{
        params : {
            password,email
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    }) 
}

export const editPasswordOtherVersion = ({email, newPassword ,grantType,accessToken}) => {
    return memberApiClient.post('/editPassword',null,{
        params : {
            email : email,
            newPassword
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    }) 
}

export const editEmail = ({email,newEmail,grantType,accessToken}) => {
    return memberApiClient.post('/editEmail',null,{
        params : {
            email : email,
            newEmail : newEmail
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    }) 
}

export const deleteUser = ({ id, grantType, accessToken}) => {
    return memberApiClient.delete('/user',{
        params : {
            id
        },
        withCredentials: true,
        headers: { Authorization:`${grantType} ${accessToken}`}
    }) 
}
