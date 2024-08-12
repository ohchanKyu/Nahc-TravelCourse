import { useContext } from "react";
import authContext from "../store/auth-context";
import loginContext from "../store/login-context";
import { refreshTokenProcess } from "../api/UserApiService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useAuthFunction = () => {

    const tokenCtx = useContext(authContext);
    const loginCtx = useContext(loginContext);
    const navigate = useNavigate();

    const authFunctionHandler = async (userFunction, parameter) => {
        
        const tryGrantType = tokenCtx.grantType;
        const tryAccessToken = localStorage.getItem("accessToken");
        const tryRefreshToken = tokenCtx.refreshToken;
        const tryAccessTokenExpiresIn = tokenCtx.accessTokenExpiresIn;

        try{
            const functionResponse = await userFunction({
                grantType : tryGrantType,
                accessToken : tryAccessToken,
                ...parameter
            });
            
            const functionResponseData = await functionResponse.data;
            return functionResponseData;

        }catch(error){
            
            if (error.response.status === 401){

                try {
                    const token = {
                        grantType : tryGrantType,
                        accessToken : tryAccessToken,
                        accessTokenExpiresIn : tryAccessTokenExpiresIn,
                        refreshToken : tryRefreshToken
                    };
    
                    const refreshTokenResponse = await refreshTokenProcess(token);
                    const refreshTokenResponseData = await refreshTokenResponse.data;
    
                    const { 
                        accessToken : newAccessToken,  
                        grantType : newGrantType, 
                        accessTokenExpiresIn : newaccessTokenExpiresIn, 
                        refreshToken : newRefreshToken 
                    } = refreshTokenResponseData;
    
                    localStorage.setItem("accessToken",newAccessToken);
                    tokenCtx.setUserToken(newGrantType,newAccessToken,newRefreshToken,newaccessTokenExpiresIn); 
    
                    const newRefreshFunctionResponse = await userFunction({
                        grantType : newGrantType,
                        accessToken : newAccessToken,
                        ...parameter
                    });
    
                    const newRefreshFunctionResponseData = await newRefreshFunctionResponse.data;
                    return newRefreshFunctionResponseData;
                }catch(error){
                    if (error.response.status === 401 || error.response.status === 403){
                        Swal.fire({
                            icon: 'warning',                        
                            title: '세션 만료',         
                            html: `세션이 만료되었습니다.<br> 다시 로그인 해주세요.`
                        });
                        loginCtx.logoutUser();
                        tokenCtx.removeUserToken();
                        localStorage.removeItem("accessToken");
                        navigate('/');
                    }
                }
                
            }
        } 
    };
    return authFunctionHandler;
};

export default useAuthFunction;