import React, { useState, useContext } from "react";
import classes from "./EditName.module.css";
import { MdEditDocument } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { editName } from "../../api/UserApiService";
import loginContext from "../../store/login-context";
import { FaCheckCircle } from "react-icons/fa";
import useAuthFunction from "../../hooks/useAuthFunction";

const EditName = (props) => {

    const [name,setName] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [successMessage,setSuccessMessage] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const loginCtx = useContext(loginContext);
    const functionHandler = useAuthFunction();

    const nameChangeHandler = (event) => {
        setName(event.target.value);
        setIsValid(true);
    };

    const editNameHandler = async () => {
        if (name.trim().length === 0){
            setIsValid(false);
            setErrorMessage("이름을 입력해주세요.");
            return;
        }
        if (name === loginCtx.name){
            setIsValid(false);
            setErrorMessage("동일한 이름입니다.");
            return;
        }
        const editNameResponseData = await functionHandler(editName,{
            email : loginCtx.email,
            newName : name
        })
        if (editNameResponseData){
            loginCtx.editNameUser(name);
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
        exit : { opacity : 0, y : -30}
    }

    return (
        <div className={classes.container}>
            <div className={classes.header_container}>
                <h4>NaHC Travel</h4>
                <p className={classes.name}>{loginCtx.name}님</p>
                <p className={classes.email}>{loginCtx.email}</p>
            </div>
            <p className={classes.input_text}><MdEditDocument style={{ marginBottom:'5px'}}/> 변경하실 이름을 입력해주세요. </p>
            <input className={classes.input_box} 
                onChange={nameChangeHandler}
                value={name}
                type='text' 
                placeholder={loginCtx.name}/>
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
                        onClick={editNameHandler}
                        whileHover={{ scale:1.1 }}>변경</motion.button>
                    <motion.button whileHover={{ scale:1.1 }} onClick={props.onClose}>취소</motion.button>
                </div>
            }
        </div>
    );
};

export default EditName;