import React, { useState } from "react";
import classes from "./ThirdType.module.css";
import { FaPencil } from "react-icons/fa6";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { SiCafepress } from "react-icons/si";
const ThirdType = (props) => {

    const [cafeName,setCafeName] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [message,setMessage] = useState(null);

    const cafeNameChangeHandler = (event) => {
        setCafeName(event.target.value);
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    const submitHanlder = () => {
        if (cafeName.trim().length === 0){
            setIsValid(false);
            setMessage('※ 카페명을 입력해주세요!');
            return;
        }
        setIsValid(true);
        setMessage(cafeName + ' 설정 완료!')
        props.onSelectCafe(cafeName);
    }



    return (
        <React.Fragment>
           <div className={classes.input_container}>
                <h4 className={classes.category_text}># 직접 입력</h4>
                <h4 className={classes.header_text}><FaPencil/> 찾고싶은 카페명을 입력해주세요 </h4>
                <input  type="text" name="cafe"
                    value={cafeName} onChange={cafeNameChangeHandler}
                    className={classes.cafe_input}/>
                <h4 className={classes.input_menu}><SiCafepress/> 현재 입력 카페 </h4>
                <h4 className={classes.input}><FaArrowCircleRight style={{ marginBottom : '5px'}}/> {cafeName} 
                    <button onClick={submitHanlder} 
                        className={`btn btn-outline-light btn-block ${classes.submit_button}`}>
                            <FaCheckCircle/> 설정하기
                    </button>
                </h4>
                {message && !isValid && <motion.p 
                            variants={variants}
                        key={message}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        className={classes.message} 
                        style={{ color:'red' }}>
                            {message}
                    </motion.p>}
                {message && isValid && <motion.p  
                    variants={variants}
                    key={message}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    className={classes.message} 
                    style={{ color:'#0aba16' }}>
                        {message}
                    </motion.p>}
           </div>
        </React.Fragment>
    );
};

export default ThirdType