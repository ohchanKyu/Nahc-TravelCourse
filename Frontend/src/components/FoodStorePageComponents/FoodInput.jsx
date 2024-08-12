import React, { useState } from "react";
import classes from "./FoodInput.module.css";
import { FaPencil } from "react-icons/fa6";
import { MdRestaurantMenu } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const FoodInput = (props) => {

    const [foodInput,setFoodInput] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [message,setMessage] = useState(null);


    const foodChangeHandler = (event) => {
        setFoodInput(event.target.value);
    };

    const submitHanlder = () => {
        if (foodInput.trim().length === 0){
            setIsValid(false);
            setMessage('※ 음식명을 입력해주세요!');
            return;
        }
        setIsValid(true);
        setMessage(foodInput + ' 설정 완료!')
        props.onSetFoodName(foodInput);
    }

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <React.Fragment>
            <div className={classes.input_container}>
                <h4 className={classes.header_text}><FaPencil/> 찾고싶은 음식 종류를 입력해주세요 </h4>
                <input  type="text" name="food"
                    value={foodInput} onChange={foodChangeHandler}
                    className={classes.food_input}/>
                <h4 className={classes.input_menu}><MdRestaurantMenu/> 현재 입력 메뉴 </h4>
                <h4 className={classes.input}><FaArrowCircleRight/> {foodInput} 
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

export default FoodInput;