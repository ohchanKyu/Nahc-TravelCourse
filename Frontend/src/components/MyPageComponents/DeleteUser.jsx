import React, { useState, useContext } from "react";
import classes from "./DeleteUser.module.css";
import loginContext from "../../store/login-context";
import authContext from "../../store/auth-context";
import useAuthFunction from "../../hooks/useAuthFunction";
import { IoIosCheckboxOutline } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { deleteUser } from "../../api/UserApiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DeleteUser = (props) => {

    const [isCheck,setIsCheck] = useState(false);
    const [isValid,setIsValid] = useState(true);
    const [errorMessage,setErrorMessage] = useState('');

    const loginCtx = useContext(loginContext);
    const tokenCtx = useContext(authContext);
    const functionHandler = useAuthFunction();
    const navigate = useNavigate();

    const checkHandler = () => {
        setIsValid(true);
        setIsCheck(state => {
            return !state;
        });
    };

    const deleteUserHandler = async () => {
        if (!isCheck){
            setIsValid(false);
            setErrorMessage("안내버튼을 동의해주세요.")
            return;
        }
        const deleteUserReponseData = await functionHandler(deleteUser,{
            id : loginCtx.id
        })
        if (deleteUserReponseData === "Delete Success"){
            Swal.fire({
                icon: 'success',                        
                title: '회원탈퇴 완료',         
                html: '회원을 탈퇴하였습니다. <br> 로그인 페이지로 이동합니다.'
            });
            loginCtx.logoutUser();
            tokenCtx.removeUserToken();
            localStorage.removeItem("accessToken");
            navigate('/');
        }
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : { opacity : 0, y : -30},
    }

    return (
        <div className={classes.container}>
            <h4 className={classes.icon}>NaHC Travel</h4>
            <p className={classes.header_text}>{loginCtx.name}님 NaHC 탈퇴 전 확인하세요.</p>
            <p className={classes.text}>
                탈퇴하시면 이용중인 NaHC Travel이 폐쇄되며 <br/>
                모든 데이터는 복구 불가입니다.
            </p>
            <ul className={classes.check_list}>
                <li className={classes.check_one} key='1'> 
                    <FaCheck style={{ marginBottom:'4px'}}/> 즐겨찾기, 여행 계획, 리뷰, 프로필 등 모든 정보가 삭제됩니다.
                </li>
                <li className={classes.check_two} key='2'> 
                    <FaCheck style={{ marginBottom:'4px'}}/> 이전 정보는 모두 삭제되며 필요한 데이터는 미리 백업을 해주세요.
                </li>
            </ul>
            <div className={classes.check_box}>
                <motion.div 
                    onClick={checkHandler}
                    whileHover={{ scale:1.1 }}
                    className={`${classes.icon_wrapper} ${isCheck ? `${classes.is_check}` : '' }`}>
                    <IoIosCheckboxOutline 
                        className={classes.check_icon}
                        style={{ marginBottom:'6px'}}/>
                </motion.div>
                 안내사항을 모두 확인하였으며, 이에 동의합니다.
            </div>
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
            <div className={classes.button_container}>
                <motion.button 
                    onClick={deleteUserHandler}
                    whileHover={{ scale:1.1 }}> 탈퇴
                </motion.button>
                <motion.button 
                    whileHover={{ scale:1.1 }} 
                    onClick={props.onClose}>취소
                </motion.button>
            </div>
        </div>
    )
};

export default DeleteUser;