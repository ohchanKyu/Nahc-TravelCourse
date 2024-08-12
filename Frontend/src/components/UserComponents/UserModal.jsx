import Modal from "../../layout/Modal";
import React, { useState } from "react";
import classes from "./UserModal.module.css";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GoPasskeyFill } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { motion,AnimatePresence } from "framer-motion";
import { editPassword } from "../../api/UserApiService";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCheckDouble } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

const UserModal = (props) => {

    const modalData  = props.modalContent;
    const userEmail = modalData.data;
    const passRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,15}$');

    const navigate = useNavigate();

    const [newPassword,setNewPassword] = useState('');
    const [newPasswordCheck,setNewPasswordCheck] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [notValidMessage,setNotValidMessage] = useState("");
    const [isEditSuccess,setIsEditSuccess] = useState(false); 

    const newPasswordChangeHandler = (event) => {
        setIsValid(true);
        setNewPassword(event.target.value);
    }

    const newPasswordCheckChangeHandler = (event) => {
        setIsValid(true);
        setNewPasswordCheck(event.target.value);
    }

    const editPasswordSubmitHandler = async () => {

        if (newPassword.trim().length === 0){
            setIsValid(false);
            setNotValidMessage(`비밀번호를 입력해주세요.`);
            return;
        }

        if (!passRegex.test(newPassword)){
            setIsValid(false);
            setNotValidMessage(`비밀번호는 영문,숫자,특수문자가 
              하나씩 포함되어야합니다.(8~15자)`);
            return;
        }
        if (newPassword !== newPasswordCheck){
            setIsValid(false);
            setNotValidMessage("비밀번호가 동일하지 않습니다. 다시 입력해주세요.");
            return;
        }
        setIsValid(true);
        const editPasswordResponse = await editPassword(userEmail,newPassword);
        const editPasswordResponseData = await editPasswordResponse.data;
        if (editPasswordResponseData){
            setIsEditSuccess(true);
        }else{
            setIsValid(false);
            setNotValidMessage("일시적 오류입니다. 다시 시도해주세요.");
        }
    }


    const closeModal = () => {
        props.onClose();
    }
    const goFindPasswordPage = () => {
        navigate("/findPass");
    }
    const goLoginPage = () => {
        navigate('/');
    }

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    let modalContent = "";
    if (modalData.type === "email_duplicated"){
        modalContent = (
            <React.Fragment>
                <h1 className={classes.modal_header}><MdError style={{ marginBottom : '5px'}}/> 이메일이 중복됩니다! </h1>
                <p className={classes.modal_sub_header}> 입력 이메일 <FaArrowRight style={{ marginBottom : '3px'}}/> {modalData.data}</p>
                <p className={classes.modal_section}> 
                    입력하신 이메일이 현재 중복됩니다. <br/>
                    다른 이메일을 입력하시거나 <br/>
                    기존의 비밀번호를 사용해주세요.
                </p>
                <div className={classes.edit_button_container}>
                    <motion.button 
                        whileHover={{scale:1.1}}
                        className={classes.cancel_button} 
                        onClick={closeModal}>
                            취소
                    </motion.button>
                    <motion.button 
                        whileHover={{scale:1.1}}
                        className={classes.submit_button} 
                        onClick={goFindPasswordPage}>
                            비밀번호 변경
                    </motion.button>
                </div>
            </React.Fragment>
        );
    }

    if (modalData.type === "edit_password"){
        modalContent = (
            <React.Fragment>
                <h1 className={classes.modal_header}><GoPasskeyFill style={{ marginBottom : '5px'}}/> 비밀번호 변경 </h1>
                {!isEditSuccess && (
                     <div className={classes.input_container}>
                        <label className={classes.input_label}><RiLockPasswordFill style={{ marginBottom : '5px'}}/> 변경 비밀번호 입력</label>
                        <input type='password' 
                            value={newPassword}
                            className={classes.input_box}
                            onChange={newPasswordChangeHandler}/>
                        <label className={classes.input_label}><FaCheckDouble  style={{ marginBottom : '5px'}}/> 변경 비밀번호 확인</label>
                        <input type='password'
                            value={newPasswordCheck}
                            className={classes.input_box} 
                            onChange={newPasswordCheckChangeHandler}/>
                    </div>
                )}
               
                <AnimatePresence>
                    {!isValid && 
                        <motion.p className={classes.error_message}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={notValidMessage}
                        ><MdError style={{ marginBottom : '3px'}} /> {notValidMessage}</motion.p>
                    }
                </AnimatePresence>
                {isEditSuccess && 
                    <motion.p className={classes.success_message}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                    ><FaCheckCircle style={{ marginBottom : '5px'}} /> 비밀번호가 변경되었습니다.</motion.p>
                }
                <div className={classes.edit_button_container}>
                    {!isEditSuccess && (
                        <React.Fragment>
                            <motion.button 
                                whileHover={{scale:1.1}}
                                className={classes.cancel_button} 
                                onClick={closeModal}>
                                    취소
                            </motion.button>
                        
                            <motion.button 
                                whileHover={{scale:1.1}}
                                className={classes.submit_button} 
                                onClick={editPasswordSubmitHandler}>
                                    변경하기
                            </motion.button>
                        </React.Fragment>
                    )}
                    {isEditSuccess &&
                        <motion.button 
                            whileHover={{scale:1.1}}
                            className={classes.submit_button} 
                            onClick={goLoginPage}>
                                로그인
                        </motion.button>
                    }
                </div>
                
            </React.Fragment>
        );
    }

    return (
        <Modal type='user' onClose={props.onClose}>
            {modalContent}
        </Modal>
        
    );
};

export default UserModal;