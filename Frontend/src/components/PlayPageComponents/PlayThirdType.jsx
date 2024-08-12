import React, { useState } from "react";
import classes from "./PlayThirdType.module.css";
import { FaPencil } from "react-icons/fa6";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoGameController } from "react-icons/io5";

const PlayThirdType = (props) => {

    const [playName,setPlayName] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [message,setMessage] = useState(null);

    const playNameChangeHandler = (event) => {
        setPlayName(event.target.value);
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    const submitHanlder = () => {
        if (playName.trim().length === 0){
            setIsValid(false);
            setMessage('※ 놀거리를 입력해주세요!');
            return;
        }
        setIsValid(true);
        setMessage(playName + ' 설정 완료!')
        props.onSelectPlace(playName);
    }



    return (
        <React.Fragment>
           <div className={classes.input_container}>
                <h4 className={classes.category_text}># 직접 입력</h4>
                <h4 className={classes.header_text}><FaPencil/> 찾고싶은 놀거리를 입력해주세요 </h4>
                <input  type="text" name="play"
                    value={playName} onChange={playNameChangeHandler}
                    className={classes.cafe_input}/>
                <h4 className={classes.input_menu}><IoGameController/> 현재 입력 놀거리 </h4>
                <h4 className={classes.input}><FaArrowCircleRight style={{ marginBottom : '5px'}}/> {playName} 
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

export default PlayThirdType;