import classes from "./Login.module.css";
import { useState, useContext } from "react"; 
import { login } from "../../api/UserApiService";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { SiYourtraveldottv } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { MdError } from "react-icons/md";
import loginContext from "../../store/login-context";
import authContext from "../../store/auth-context";

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isValid,setIsValid] = useState(true);
    const [notValidMessage,setNotValidMessage] = useState("");

    const navigate = useNavigate();
    const loginCtx = useContext(loginContext);
    const tokenCtx = useContext(authContext);

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        // email valid expression
        // @ , . 포함 확인
        // .뒤에 2~3개의 문자 필요
        let regex = new RegExp('[a-z0-9]+@[a-z]+\[a-z].[a-z]{2,3}');
        
        if (!regex.test(email)){
            setNotValidMessage("유효하지 않은 이메일입니다.");
            setIsValid(false);
            return;
        }

        if (email.length === 0 || password.length === 0){
            if (email.length === 0){
                setNotValidMessage("이메일을 입력해주세요.");
            }else{
                setNotValidMessage("비밀번호를 입력해주세요.");
            }
            setIsValid(false);
            return;
        }

        login({ email, password })
        .then(response => {
           return response.data
        }).then(
            responseData => {
                const {id,name,email,password} = responseData.MEMBER;
                const {accessToken, grantType, refreshToken, accessTokenExpiresIn} = responseData.TOKEN;
                localStorage.setItem("accessToken",accessToken);
                loginCtx.loginUser(id,name,email,password);
                tokenCtx.setUserToken(grantType,accessToken,refreshToken,accessTokenExpiresIn);
                navigate("/NaHC/main");
            }
        )
        .catch(error => {
            if (error.response && error.response.status === 401) {
                setIsValid(false);
                setNotValidMessage("로그인하신 회원정보가 없습니다.");
                return;
            } else {
                setIsValid(false);
                setNotValidMessage("잠시 후에 다시 시도해주세요.");
            }
        });
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <form className={classes.form_container} onSubmit={submitHandler}>
            <h1 className={classes.login_header}> NaHC <SiYourtraveldottv/></h1>
            <AnimatePresence>
                {!isValid && 
                    <motion.p className={classes.error_message}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={notValidMessage}
                    ><MdError/> {notValidMessage}</motion.p>
                }
            </AnimatePresence>
           
            <label className={classes.email_label}><FaUser/> User Id </label>
            <input type="text" name="email"
                value={email} onChange={emailChangeHandler}
                className={classes.email_input}
            />
            <label className={classes.password_label}><RiLockPasswordFill/> User Password </label>
            <input type="password" name="password"
                value={password} onChange={passwordChangeHandler}
                className={classes.password_input}
            />
            <div className={classes.button_container}>
                <button 
                    type="submit" 
                    className="btn btn-outline-dark login-button"
                    id={classes.login_button}>
                        Login
                </button>
            </div>
        </form>
    );
};

export default Login;