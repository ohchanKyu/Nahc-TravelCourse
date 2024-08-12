import React, { useState } from "react";
import classes from "./FindId.module.css";
import { FaUser } from "react-icons/fa";
import { SiYourtraveldottv } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { MdAttachEmail } from "react-icons/md";
import { findEmail } from "../../api/UserApiService";
import { MdError } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const FindId = () => {

    const [name,setName] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [notValidMessage,setNotValidMessage] = useState("");
    const [isFindEmail,setIsFindEmail] = useState(false);
    const [email,setEmail] = useState([]);

    const nameChangeHandler = (event) => {
        setIsFindEmail(false);
        setName(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (name.trim().length === 0){
            setIsValid(false);
            setNotValidMessage("이름을 입력해주세요.");
            return;
        }
        
        
        const response = await findEmail(name);
        const responseData = await response.data;
        if (responseData){
            setIsValid(true);
            setIsFindEmail(true);
            setEmail(responseData);  
        }else{
            setIsValid(false);
            setIsFindEmail(false);
            setNotValidMessage("이름과 일치하는 이메일이 존재하지 않습니다.");
        }
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <form className={classes.form_container} onSubmit={submitHandler}>
            <h1 className={classes.find_id_header}> NaHC <SiYourtraveldottv/></h1>
            <p className={classes.find_id_text}><MdAttachEmail/> Find Email </p>
            {!isValid && 
                <AnimatePresence>
                    <motion.p className={classes.error_message}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={notValidMessage}
                    ><MdError/> {notValidMessage}</motion.p>
                </AnimatePresence>
            }
            <label className={classes.name_label}><FaUser/> User Name </label>
            <input type="text" name="email"
                value={name} onChange={nameChangeHandler}
                className={classes.name_input}
            />
            <AnimatePresence>
                {isFindEmail && 
                    <motion.div className={classes.find_email_container}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={name}>
                        <p className={classes.email_label}><FaSearch/> Your Email! </p>
                            <p className={classes.email_text}>{name}님의 이름으로 가입하신 {email.length}개의 이메일이 존재합니다.</p>
                            <ul className={classes.email_list}>
                                {email.map(item => {
                                    return (
                                        <li className={classes.email_item} key={item}><IoIosArrowDropdownCircle/> {item}</li>
                                    );
                                })}
                            </ul>
                    </motion.div>
                }
            </AnimatePresence>
            <div className={classes.button_container}>
                <button 
                    type="submit" 
                    className="btn btn-outline-success"
                    id={classes.find_id_button}>
                        Find Email
                </button>
            </div>
        </form>
    );
};

export default FindId;