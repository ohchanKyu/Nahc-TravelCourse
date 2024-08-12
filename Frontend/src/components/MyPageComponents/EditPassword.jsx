import React, { useState, useContext } from "react";
import classes from "./EditPassword.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import loginContext from "../../store/login-context";
import { checkPassword, editPasswordOtherVersion } from "../../api/UserApiService";
import useAuthFunction from "../../hooks/useAuthFunction";

const EditPassword = (props) => {

    const loginCtx = useContext(loginContext);
    const functionHandler = useAuthFunction();

    const [isValid,setIsValid] = useState(true);
    const [successMessage,setSuccessMessage] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const [currentPassword,setCurrentPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [checkNewPassword,setCheckNewPassword] = useState('');

    const currentPasswordChangeHandler = (event) => {
        setCurrentPassword(event.target.value);
        setIsValid(true);
    }

    const newPasswordChangeHandler = (event) => {
        setNewPassword(event.target.value);
        setIsValid(true);
    }

    const checkNewPasswordChangeHandler = (event) => {
        setCheckNewPassword(event.target.value);
        setIsValid(true);
    }

    const editPasswordHandler = async () => {

        if (currentPassword.trim().length === 0){
            setErrorMessage("현재 비밀번호를 입력해주세요.");
            setIsValid(false);
            return;
        }

        const checkPasswordResponseData = await functionHandler(checkPassword,{
            email : loginCtx.email,
            password : currentPassword
        });

        if (!checkPasswordResponseData){
            setErrorMessage("현재 비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
            setIsValid(false);
            return;
        }

        let passRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,15}$');

        if (!passRegex.test(newPassword)){
            setIsValid(false);
            setErrorMessage(`비밀번호는 영문,숫자,특수문자가 하나씩 포함되어야합니다.(8~15자)`);
            return;
        }
        if (newPassword !== checkNewPassword){
            setIsValid(false);
            setErrorMessage(`새 비밀번호가 동일하지 않습니다.`);
            return;
        }

        const editPasswordResponseData =  await functionHandler(editPasswordOtherVersion,{
            email : loginCtx.email,
            newPassword
        });
        if (editPasswordResponseData){
            loginCtx.editPasswordUser(newPassword);
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
            <input className={classes.input_box}
                style={{ marginBottom : '10px'}} 
                onChange={currentPasswordChangeHandler}
                value={currentPassword}
                type='password'
                placeholder="현재 비밀번호"/>
            <input className={classes.input_box} 
                onChange={newPasswordChangeHandler}
                value={newPassword}
                type='password'
                placeholder="새 비밀번호"/>
            <input className={classes.input_box} 
                onChange={checkNewPasswordChangeHandler}
                value={checkNewPassword}
                type='password'
                placeholder="새 비밀번호 확인"/>
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
                        onClick={editPasswordHandler}
                        whileHover={{ scale:1.1 }}>변경</motion.button>
                    <motion.button whileHover={{ scale:1.1 }} onClick={props.onClose}>취소</motion.button>
                </div>
            }
        </div>
    );
};

export default EditPassword;