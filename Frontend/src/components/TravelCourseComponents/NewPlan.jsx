import React, { useState } from "react";
import classes from "./NewPlan.module.css";
import { motion } from "framer-motion";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import Modal from "../../layout/Modal";
import { FaMapLocationDot } from "react-icons/fa6";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { getLocaleByAddress } from "../../api/LocationApiService";
import useAuthFunction from "../../hooks/useAuthFunction";

const NewPlan = (props) => {

    const [currentStep,setCurrentStep] = useState(1);
    const [currentPlace,setCurrentPlace] = useState(null);
    const [date,setDate] = useState([]);

    const functionHandler = useAuthFunction();

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    const passSecondStepHandler = (place) => {
        setCurrentPlace(place);
        setCurrentStep(2);
    }

    const backFirstStepHandler = () => {
        setCurrentPlace(null);
        setCurrentStep(1);
    }

    const dateHandler = (date) => {
        setDate(date);
        setCurrentStep(3);
    }

    const resetState = () => {
        setCurrentStep(1);
        setCurrentPlace(null);
        setDate([]);
    };

    const completeState = async () => {

        const locationResponseData = await functionHandler(getLocaleByAddress,{
            address : currentPlace
        })
        const locationX =  locationResponseData.x;
        const locationY =  locationResponseData.y;
        props.onGoPlan(currentPlace, date , locationX, locationY);
    };

    return (
        <motion.div 
            key={currentStep}
            variants={variants}
            initial='initial'
            animate='animate'
            exit='exit'
            className={classes.container}>
            {currentStep === 1 && <FirstStep onPass={passSecondStepHandler}/>}
            {currentStep === 2 && <SecondStep onSetDate={dateHandler} backStep={backFirstStepHandler} place={currentPlace}/>}
            {currentStep === 3 && (
                <Modal>
                    <div className={classes.new_plan_result_container}>
                        <h4> 일정 입력 결과 </h4>
                        <p className={classes.place_header}><FaMapLocationDot style={{ marginBottom : '5px'}}/> 여행 및 데이트 장소 </p>
                        <p className={classes.place_result}>{currentPlace}</p>
                        <p className={classes.date_header}>
                            <BsFillCalendarDateFill  style={{ marginBottom : '5px'}}/> 등록 날짜
                        </p>
                        <p className={classes.date_result}>
                            {date.length === 1 && <span>{date[0]}</span>}
                            {date.length === 2 && <span>{date[0]} ~ {date[1]}</span>}
                        </p>
                        <p className={classes.message}>
                            위의 입력이 맞으시면 <span style={{ color:'#0aba16'}} >일정 확정</span> 버튼을 클릭해주세요! <br/>
                            여행 일정 작성 페이지로 이동합니다. <br/>
                            만약 초기화 하고 싶다면 <span style={{ color:'red'}}>다시 선택</span> 버튼을 눌러주세요!
                        </p>
                        <div className={classes.button_container}>
                            <motion.button whileHover={{ scale:1.1}} className={classes.reset_button} onClick={resetState}>다시 선택</motion.button>
                            <motion.button  whileHover={{ scale:1.1}} className={classes.complete_button} onClick={completeState}>일정 확정</motion.button>
                        </div>
                    </div>
                </Modal>
            )}
        </motion.div>
    );
};

export default NewPlan;