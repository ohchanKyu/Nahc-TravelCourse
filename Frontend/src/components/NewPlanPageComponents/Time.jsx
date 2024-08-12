import React, { useState } from "react";
import classes from "./Time.module.css";
import { motion } from "framer-motion";
import { RiTimerFill } from "react-icons/ri";

const allHourArray = []
for (let i = 0; i <= 23; i++) {
    allHourArray.push(i);
}

const allMinuteArray = []
for (let i = 0; i <= 59; i++) {
    allMinuteArray.push(i);
}

const Time = (props) => {

    const [hour,setHour] = useState(null);
    const [minute,setMinute] = useState(null);
    const [state,setState] = useState({
        valid : true,
        message : ''
      });

    const setHourHandler = (event) => {
        let selectHour = parseInt(event.target.dataset.hour);
        if (selectHour < 10){
            selectHour = '0'+selectHour;
        }
        setState(item => {
            return {
                ...item,
                valid :true,
                message : ''
            }
        })
        setHour(selectHour)
    };

    const setMinuteHandler = (event) => {
        let selectMinute = parseInt(event.target.dataset.minute);
        if (selectMinute < 10){
            selectMinute = '0'+selectMinute;
        }
        setState(item => {
            return {
                ...item,
                valid :true,
                message : ''
            }
        })
        setMinute(selectMinute)
    }

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
    }

    const submitHandler = () => {
        if (!hour){
            setState(item => {
                return {
                    ...item,
                    valid :false,
                    message : '시간을 선택해주세요!'
                }
            })
            return;
         }
         else if (!minute){
            setState(item => {
                return {
                    ...item,
                    valid :false,
                    message : '분을 선택해주세요!'
                }
            })
            return;
         }
        const submitText = hour+':'+minute;
        props.onClose();
        props.onSubmit(submitText);
    }

    const removeHandler = () => {
        props.onClose();
        props.onSubmit('');
    }

    return (
        <div className={classes.time_container}>
            <h4> {props.onState ? '시간 변경' : '시간 추가' } <RiTimerFill style={{ marginBottom : '5px'}}/></h4>
            <div className={classes.header_container}>
                <p className={classes.hour_header}>Hour</p>
                <p className={classes.minute_header}>Minute</p>
            </div>
            <div className={classes.time_box}>
                <div className={classes.hour_box}>
                    {allHourArray.map(item => {
                        return <motion.p 
                                    onClick={setHourHandler}
                                    whileHover={{ color:'white', backgroundColor : '#217af4'}}
                                    className={classes.hour} data-hour={item} key={`hour${item}`}>{item}</motion.p>
                    })}
                </div>
                <div className={classes.minute_box}>
                    {allMinuteArray.map(item => {
                        return <motion.p 
                                    onClick={setMinuteHandler}
                                    whileHover={{ color:'white', backgroundColor : '#217af4'}}
                                    className={classes.minute} data-minute={item} key={`minute${item}`}>{item}</motion.p>
                    })}
                </div>
            </div>
            <p className={classes.time_result}>
                <motion.span
                    key={`hour${hour}`}
                    variants={variants}
                    animate='animate'
                    initial='initial'>
                    {hour}
                </motion.span>
                <span>:</span>
                <motion.span
                    key={`minute${minute}`}
                    variants={variants}
                    animate='animate'
                    initial='initial'>
                    {minute} 
                </motion.span>
            </p>
           
             {!state.valid && <motion.p key={state.message}
                  animate='animate' initial='initial' variants={variants}
                  className={classes.message}>{state.message}</motion.p>}
             {props.onState && (
                <div className={classes.button_container}>
                    <motion.div 
                        whileHover={{backgroundColor:'#0260be', color:'#fff'}}
                        onClick={removeHandler}
                        className={classes.cancel_container}>
                        삭제
                    </motion.div>
                    <motion.div 
                        onClick={submitHandler}
                        whileHover={{backgroundColor:'#0260be', color:'#fff'}}
                        className={classes.submit_container}>
                        변경
                    </motion.div>
                </div>
              )}
              {!props.onState && (
                <div className={classes.button_container}>
                    <motion.div 
                        whileHover={{backgroundColor:'#0260be', color:'#fff'}}
                        onClick={props.onClose} 
                        className={classes.cancel_container}>
                        취소
                    </motion.div>
                    <motion.div 
                        onClick={submitHandler}
                        whileHover={{backgroundColor:'#0260be', color:'#fff'}}
                        className={classes.submit_container}>
                        저장
                    </motion.div>
                </div>
              )}
        </div>
    );
};

export default Time;