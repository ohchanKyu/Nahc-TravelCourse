import React from "react";
import classes from "./MyPlan.module.css";
import { FcPlanner } from "react-icons/fc";
import { motion } from "framer-motion";
import { FaCalendarCheck } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MyPlan = (props) => {

    const registerPlanHandler = () => {
        props.onSetRegister(1);
    };

    const navigate = useNavigate();

    const goMyPage = () => {
        navigate('/NaHC/myDetail');
    }

    return (
        <div className={classes.container}>
            <h3><FcPlanner style={{ marginBottom : '5px'}}/> My Plaaner</h3>
            <p><FaList style={{ marginBottom : '5px'}} /> 등록하신 일정에 대해 지금 바로 확인해보세요! </p>
            <motion.button whileHover={{scale : 1.2}} onClick={goMyPage} className={classes.go_my_list_button}>내 일정 확인!</motion.button>
            <p style={{ marginTop : '20px'}}><FaCalendarCheck style={{ marginBottom : '5px'}}/> 아직 등록하신 일정이 없다면 바로 등록 해보세요!</p>
            <motion.button onClick={registerPlanHandler} whileHover={{scale : 1.2}} className={classes.go_my_list_button}>
                일정 등록!
            </motion.button>
        </div>
    )
};

export default MyPlan;