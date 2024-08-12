import { useState } from "react";
import { SiYourtraveldottv } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";
import classes from "./Signup.module.css";
import { MdSupervisorAccount } from "react-icons/md";
import { signUp } from "../../api/UserApiService";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import Swal from "sweetalert2";

const defaultInputState = {
    password : '',
    passwordCheck : '',
    email : '',
    name : ''
}

const Signup = (props) => {

    const [inputState,SetInputState] = useState(defaultInputState);
    const [isValid,setIsValid] = useState(true);
    const [notValidMessage,setNotValidMessage] = useState("");
    const [isSubmitting,setIsSubmitiing] = useState(false);

    const navigate = useNavigate();

    const inputChangeHandler = (event) => {
        const {name, value} = event.target;
        SetInputState(prevState => {
            return {...prevState,[name] : value};
        })
    };

    const sumbitHandler = async (event) => {
        event.preventDefault();

        const {name,email,password,passwordCheck} = inputState;

        let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\[a-z].[a-z]{2,3}');
        // 8~15자, 영문알파벳 1개 포함,하나의 숫자 포함, 하나의 특수문자 포함
        let passRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,15}$');

        if (name.trim().length === 0){
            setIsValid(false);
            setNotValidMessage("이름을 입력해주세요.");
            return;
        }
        if (!emailRegex.test(email)){
            setNotValidMessage("유효하지 않은 이메일입니다.");
            setIsValid(false);
            return;
        }
        if (!passRegex.test(password)){
            setIsValid(false);
            setNotValidMessage(`비밀번호는 영문,숫자,특수문자가 
              하나씩 포함되어야합니다.(8~15자)`);
            return;
        }
        if (password !== passwordCheck){
            setIsValid(false);
            setNotValidMessage("비밀번호가 동일하지 않습니다. 다시 입력해주세요.");
            return;
        }
        setIsValid(true);
        setIsSubmitiing(true);
        const userData = {
            name : name,
            email : email,
            password : password
        };
        const response = await signUp(userData);
        const responseData = await response.data;
        if (responseData){
            setIsSubmitiing(false);
            Swal.fire({
                icon: 'success',                        
                title: '회원가입 완료',         
                html: '회원가입에 성공하셨습니다. <br> 로그인 페이지로 이동합니다.'
            });
            navigate('/');
        }else{
            setIsSubmitiing(false);
            SetInputState(prevState => {
                return {...prevState, email : ''};
            })
            props.onModalShown();
            props.onChangeModal({
                type : 'email_duplicated',
                data : email
            })
        }
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <form className={classes.form_container} onSubmit={sumbitHandler}>
            <h1 className={classes.signup_header}> NaHC <SiYourtraveldottv/></h1>
            <p className={classes.signup_text}><MdSupervisorAccount/> Create Account</p>
            <AnimatePresence>
                {!isValid && 
                    <motion.p className={classes.error_message}
                        style={{ whiteSpace: 'pre-line' }}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={notValidMessage}
                    ><MdError/> {notValidMessage}</motion.p>
                }
            </AnimatePresence>
        
            <label className={classes.name_label}><FaUser/> User Name </label>
            <input type="text" name="name"
                value={inputState.name} onChange={inputChangeHandler}
                className={classes.name_input}
            />

            <label className={classes.email_label}><MdEmail/> User Email </label>
            <input type="text" name="email"
                value={inputState.email} onChange={inputChangeHandler}
                className={classes.email_input}
            />
    
            <label className={classes.password_label}><RiLockPasswordLine/> User Password </label>
            <input type="password" name="password"
                value={inputState.password} onChange={inputChangeHandler}
                className={classes.password_input}
            />

            <label className={classes.passwordCheck_label}><RiLockPasswordFill/> Check Password  </label>
            <input type="password" name="passwordCheck"
                value={inputState.passwordCheck} onChange={inputChangeHandler}
                className={classes.passwordCheck_label}
            />
            {!isSubmitting && <button type="submit" className="btn btn-outline-success " id={classes.submit_button}> Sign up</button>}
            {isSubmitting && <button type="button" className="btn btn-outline-success " id={classes.submit_button} disabled> Submitting... </button>}
        </form>
    );
};

export default Signup;