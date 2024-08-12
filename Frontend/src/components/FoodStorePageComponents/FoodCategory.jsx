import React, { useState } from "react";
import classes from "./FoodCategory.module.css";
import { motion } from "framer-motion";
import { MdRestaurantMenu } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const FoodCategory = (props) => {

    const [food,setFood] = useState(null);
    const [isValid,setIsValid] = useState(true);
    const [message,setMessage] = useState(null);

    const setFoodHandler = (event) => {
        setFood(event.target.value);
    }

    const submitHanlder = () => {
        if (!food){
            setIsValid(false);
            setMessage("※ 카테고리에서 선택 후 버튼을 눌러주세요!");
            return;
        }
        setIsValid(true);
        setMessage(food+'으로 선택되었습니다.')
        props.onSetFoodName(food);
    }

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <React.Fragment>
            <div className={`row ${classes.category_container}`}>
                <div className={`col col-lg-6 ${classes.text_container}`}>
                    <h4> 선택 가능한 항목 </h4>
                    <ul>
                        <motion.li whileHover={{ scale :1.2, opacity:1}} key={'korea'}>한식</motion.li>
                        <motion.li whileHover={{ scale :1.2, opacity:1}} key={'china'}>중식</motion.li>
                    </ul>
                    <ul>
                        <motion.li whileHover={{ scale :1.2, opacity:1}} key={'japan'}>일식</motion.li>
                        <motion.li whileHover={{ scale :1.2, opacity:1}} key={'america'}>양식</motion.li>
                    </ul>
                </div>
                <div className={`col col-lg-6 ${classes.select_container}`}>
                    <h4>항목을 선택해 주세요.</h4>
                    <p className={classes.select_menu}><MdRestaurantMenu/> Choose Menu</p>
                    <select onChange={setFoodHandler}>
                        <option value='한식'>한식</option>
                        <option value='중식'>중식</option>
                        <option value='일식'>일식</option>
                        <option value='양식'>양식</option>
                    </select>
                    <p className={classes.select_menu} style={{ marginBottom : 0 }}><MdRestaurantMenu/> 현재 선택 메뉴 </p>
                    <motion.p className={classes.select}
                        variants={variants}
                        key={food}
                        initial='initial'
                        animate='animate'
                        exit='exit'> 
                        <FaArrowCircleRight/>  {food ? food : 'None'}
                    </motion.p>
                    <button onClick={submitHanlder} 
                        className={`btn btn-outline-light btn-sm ${classes.submit_button}`}>
                        <FaCheckCircle/> 설정하기
                    </button>
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
            </div>
        </React.Fragment>
      
    );
};

export default FoodCategory;