import React from "react";
import classes from "./UserDetail.module.css";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const UserDetail = (props) => {

    const passModalTypeHandler = (type) => {
        props.onShowModal(type);
    }

    return (
        <React.Fragment>
            <div className={classes.edit_container}>
                <ul className={classes.edit_list}>
                    <motion.li
                        onClick={() => passModalTypeHandler('name')} 
                        whileHover={{ scale : 1.1,backgroundColor:'rgba(54,143,255,1)', color:'#fff'}}
                        key="name">
                        <FaUser className={classes.icon}/>
                        <p className={classes.name}>이름 변경</p>
                    </motion.li>
                    <motion.li 
                        onClick={() => passModalTypeHandler('email')} 
                        whileHover={{scale:1.1 ,backgroundColor:'rgba(54,143,255,1)', color:'#fff'}}
                        key='email'>
                        <MdEmail className={classes.icon}/>
                        <p className={classes.email}>이메일 변경</p>
                    </motion.li>
                    <motion.li
                        onClick={() => passModalTypeHandler('password')}  
                        whileHover={{scale:1.1, backgroundColor:'rgba(54,143,255,1)', color:'#fff'}}
                        key='password'>
                        <RiLockPasswordFill className={classes.icon}/>
                        <p className={classes.password}>비밀번호 변경</p>
                        
                    </motion.li>
                    <motion.li 
                        onClick={() => passModalTypeHandler('delete')} 
                        whileHover={{scale:1.1, backgroundColor:'rgba(54,143,255,1)', color:'#fff'}}
                        key='trash'>
                        <FaTrash className={classes.icon}/>
                        <p className={classes.trash}> 회원 탈퇴</p>
                    </motion.li>
                </ul>
            </div>
        </React.Fragment>
    )
};

export default UserDetail;