import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useContext, useEffect } from "react";
import loginContext from "../store/login-context";
import authContext from "../store/auth-context";
import Loading from "../components/Loading";

function RootLayout() {

    const navigation = useNavigation();
    const navigate = useNavigate();

    const authCtx = useContext(authContext);
    const loginCtx = useContext(loginContext);
    const email = loginCtx.email;
    const password = loginCtx.password;

    useEffect(() => {
        if (email.trim().length === 0 || password.trim().length === 0){
            navigate("/");
        }
    },[email,password,navigate]);


    const logout = () => {
        loginCtx.logoutUser();
        authCtx.removeUserToken();
        localStorage.removeItem("accessToken");
        navigate('/');
    };

    return (
        <>
            <MainNavigation logout={logout} name={loginCtx.name}/>
            <main>
                {navigation.state === 'loading' && <Loading/>}
                <Outlet/>
            </main>
        </>
    );
};

export default RootLayout;