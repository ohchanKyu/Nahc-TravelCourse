import React, { useState } from "react";
import classes from "./SecondStep.module.css";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaArrowCircleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaMapLocationDot } from "react-icons/fa6";
import SelectDate from "./SelectDate";

const SecondStep = (props) => {

    const [date,setDate] = useState(null);
    const [dateType,setDateType] = useState(null);

    const [firstDate,setFirstDate] = useState(null);
    const [secondDate,setSecondDate] = useState(null);

    const [isValid,setIsValid] = useState(true);
    const [errorMessage,setErrorMessage] = useState('');

    const dateChangeHandler = (date) => {
       setDate(date);
       setFirstDate(null);
       setSecondDate(null);
    }

    const doubleDateChangeHandler = (order,date) => {
        if (order === 1){
            setFirstDate(date);
        }else if (order === 2){
            setSecondDate(date);
        }
        setDate(null);
    };

    const setDateTypeHandler = (event) => {
        const value = event.target.dataset.value;
        if (value === '1'){
            setFirstDate(null);
            setSecondDate(null);
            setDateType(value);
        }else{
            setDate(null);
            setDateType(value);
        }
    };

    const dateValidHandler = () => {
        if (!dateType){
            setIsValid(false);
            setErrorMessage("날짜 타입 먼저 선택하세요!");
            return;
        }
        if (dateType === '1'){
            if (!date){
                setIsValid(false);
                setErrorMessage("날짜를 선택해주세요!");
                return;
            }else{
                props.onSetDate([date]);
            }
        }else if (dateType === '2'){
            if (!firstDate){
                setIsValid(false);
                setErrorMessage("첫날 날짜를 선택해주세요");
                return;
            }else if (!secondDate){
                setIsValid(false);
                setErrorMessage("마지막날 날짜를 선택해주세요");
                return;
            }else{
                var first = new Date(firstDate+'T00:00:00');
                var second = new Date(secondDate+'T00:00:00');
                if (first > second){
                    setIsValid(false);
                    setErrorMessage("날짜 지정이 잘못되었습니다. 다시 확인해주세요!");
                    return;
                }if (firstDate === secondDate){
                    setIsValid(false);
                    setErrorMessage("날짜가 동일합니다. 하루로 선택해주세요!");
                    return;
                }

            }
            props.onSetDate([firstDate,secondDate]);
        }
    };


    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <div className={classes.container}>
            <h4><BsCalendar2DateFill style={{ marginBottom : '5px'}}/> 여행 날짜를 등록해주세요.</h4>
            <div className='row'>
                <div className='col col-lg-6'>
                    <div className={classes.place_text}>
                        <FaMapLocationDot style={{ marginBottom : '3px'}}/> 현재 선택 장소 <br/> <FaArrowCircleRight style={{ marginBottom : '3px' , fontSize:'18px'}}/> <span>{props.place}</span>
                    </div>
                    <motion.button whileHover={{ scale : 1.1 }} onClick={props.backStep} className={classes.back_button}>장소 재선택하기!</motion.button>
                </div>
                <div className='col col-lg-6'>
                    <div className={classes.place_text}><BsCalendar2DateFill style={{ marginBottom : '5px'}}/> 여행 날짜 등록 </div>
                    <div className={classes.select_date_container}>
                        <motion.span 
                            data-value='1'
                            onClick={setDateTypeHandler}
                            whileHover={{ scale : 1.1 }}>하루
                        </motion.span> 
                        <motion.span 
                            data-value='2'
                            onClick={setDateTypeHandler}
                            whileHover={{ scale : 1.1 }}>
                                2일 이상
                        </motion.span>
                    </div>
                    {!dateType && <p className={classes.message}> 날짜 타입을 선정해주세요. </p>}
                    <motion.div key={dateType}
                        animate='animate'
                        initial='initial'
                        exit='exit' 
                        variants={variants}>
                        <SelectDate type={dateType} onDoubleChangeDate={doubleDateChangeHandler} onChangeDate={dateChangeHandler}/>
                    </motion.div>
                    {!isValid && <motion.p 
                        key={errorMessage}
                        animate='animate'
                        initial='initial'
                        exit='exit'
                        variants={variants}
                        className={classes.error_messgage}>
                            {errorMessage}
                    </motion.p>}
                    <motion.button whileHover={{ scale : 1.1 }} onClick={dateValidHandler} className={classes.date_button}>날짜 등록하기!</motion.button>
                </div>
            </div>
        </div>
    );
};

export default SecondStep;