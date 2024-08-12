import React, { useState } from "react";
import classes from "./FindPass.module.css";
import { sendEmail } from "../../api/UserApiService";
import { SiYourtraveldottv } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { MdAttachEmail } from "react-icons/md";
import { MdError } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { GoPasskeyFill } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";

const FindPass = (props) => {

    const [email,setEmail] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [notValidMessage,setNotValidMessage] = useState("");

    const [IsSending,setIsSending] = useState(false); 
    const [validMailSending, setValidMailSending] = useState(false);

    const [authenticatedNumber, setAuthenticatedNumber] = useState("");
    const [userInputNumber,setUserInputNumber] = useState(""); 

    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\[a-z].[a-z]{2,3}');

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const authenticatedNumberChangeHandler = (event) => {
        setUserInputNumber(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (userInputNumber.trim().length === 0){
            setIsValid(false);
            setNotValidMessage('인증번호를 입력해주세요');
            return;
        }
        if (userInputNumber !== authenticatedNumber){
            setIsValid(false);
            setNotValidMessage('입력하신 인증번호가 다릅니다. 다시 한 번 확인해주세요');
            return;
        }
        setIsValid(true);
        setValidMailSending(false);
        props.onModalShown();
        props.onChangeModal({
            type : 'edit_password',
            data : email
        })
        setUserInputNumber('');
        setEmail('');
    };

    const sendEmailForAuthenticatedNumber = async () => {
        if (email.trim().length === 0){
            setIsValid(false);
            setValidMailSending(false);
            setNotValidMessage('이메일을 입력해주세요');
            return;
        }
        if (!emailRegex.test(email)){
            setIsValid(false);
            setValidMailSending(false);
            setNotValidMessage('유효하지 않은 이메일입니다. 다시 입력해주세요');
            return;
        }
        setIsValid(true);
        setIsSending(true);
        const response = await sendEmail(email);
        const responseData = await response.data;
        setIsSending(false);

        if (!responseData){
            setIsValid(false);
            setValidMailSending(false);
            setNotValidMessage('존재하지 않는 이메일입니다. 다시 한 번 확인해주세요');
        }else{
            setValidMailSending(true);
            setAuthenticatedNumber(responseData);
        }
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }
    
    return (
        <form className={classes.form_container} onSubmit={submitHandler}>
            <h1 className={classes.find_pass_header}> NaHC <SiYourtraveldottv/></h1>
            <p className={classes.find_pass_text}><RiLockPasswordFill/> Edit Password </p>
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
           
            <label className={classes.email_label}><MdAttachEmail/> User Email </label>
            <input type="text" name="email"
                value={email} onChange={emailChangeHandler}
                className={classes.email_input}
            />
            <AnimatePresence>
                {validMailSending && <motion.p className={classes.sending_mail_text}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={authenticatedNumber}
                ><FaCheckCircle/> 이메일이 전송되었습니다. </motion.p>}
            </AnimatePresence>
            {!IsSending && <button className="btn btn-outline-success btn-sm" 
                onClick={sendEmailForAuthenticatedNumber}
                id={classes.email_button}
                type='button'
                >
                인증번호받기
            </button>}
            {IsSending && <button className="btn btn-outline-success btn-sm" 
                onClick={sendEmailForAuthenticatedNumber}
                id={classes.email_button}
                disabled
                >
                Sending...
            </button>}
            
            <label className={classes.authenticatedNumber_label}><GoPasskeyFill/> 인증번호 입력 </label>
            <input type="text" name="authenticatedNumber"
                value={userInputNumber} onChange={authenticatedNumberChangeHandler}
                className={classes.authenticatedNumber_input}
            />

            <div className={classes.button_container}>
                <button 
                    type="submit" 
                    className="btn btn-outline-success"
                    id={classes.find_pass_button}>
                        Edit Password
                </button>
            </div>
        </form>
    );
};

export default FindPass;