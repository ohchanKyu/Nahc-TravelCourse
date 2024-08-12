import React,{ useState, useContext } from "react";
import classes from "./EditEmail.module.css";
import loginContext from "../../store/login-context";
import useAuthFunction from "../../hooks/useAuthFunction";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { editEmail, duplicatedEmail } from "../../api/UserApiService";

const EditEmail = (props) => {

    const [email,setEmail] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [successMessage,setSuccessMessage] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const loginCtx = useContext(loginContext);
    const functionHandler = useAuthFunction();

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
        setIsValid(true);
    }

    const editEmailHandler = async () => {

        let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\[a-z].[a-z]{2,3}');

        if (email.trim().length === 0){
            setErrorMessage("이메일을 입력해주세요.");
            setIsValid(false);
            return;
        }
        if (!emailRegex.test(email)){
            setErrorMessage("유효하지 않은 이메일입니다.");
            setIsValid(false);
            return;
        }
        const duplicatedEmailReponseData = await functionHandler(duplicatedEmail,{
            newEmail : email
        })
        if (duplicatedEmailReponseData){
            setErrorMessage("이메일이 중복됩니다. 다른 이메일을 사용해주세요.");
            setIsValid(false);
            return;
        }
        const editEmailResponseData = await functionHandler(editEmail,{
            email : loginCtx.email,
            newEmail : email,
        })
        if (editEmailResponseData){
            loginCtx.editEmailUser(email);
            setIsValid(true);
            setSuccessMessage("변경 완료하였습니다.");
            setTimeout(() => {
                props.onClose();
            },1000);
        }else{
            setIsValid(false);
            setErrorMessage("실패했습니다. 다시 시도해주세요.");
        }
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : { opacity : 0, y : -30},
    }

    return (
        <div className={classes.container}>
            <div className={classes.header_container}>
                <h4>NaHC Travel</h4>
                <p className={classes.name}>{loginCtx.name}님</p>
                <p className={classes.email}>{loginCtx.email}</p>
            </div>
            <p className={classes.input_text}><MdEditDocument style={{ marginBottom:'5px'}}/> 변경하실 이메일을 입력해주세요. </p>
            <input className={classes.input_box} 
                onChange={emailChangeHandler}
                value={email}
                type='text' 
                placeholder={loginCtx.email}/>
            <AnimatePresence> 
                {!isValid && 
                    <motion.p variants={variants}
                        initial='initial' animate='animate' exit='exit'
                        key={errorMessage}
                        className={classes.message}>
                            <FaCheckCircle style={{ marginBottom : '5px'}}/> {errorMessage}
                    </motion.p>
                }
            </AnimatePresence>
            {isValid && successMessage.trim().length !== 0 && 
                <motion.p variants={variants}
                initial='initial' animate='animate'
                key={successMessage}
                className={classes.success_message}>
                    <FaCheckCircle style={{ marginBottom : '5px'}}/> {successMessage}
                </motion.p>}
            {successMessage.trim().length === 0 &&
                <div className={classes.button_container}>
                    <motion.button 
                        onClick={editEmailHandler}
                        whileHover={{ scale:1.1 }}>변경</motion.button>
                    <motion.button whileHover={{ scale:1.1 }} onClick={props.onClose}>취소</motion.button>
                </div>
            }
        </div>
    );
};

export default EditEmail;