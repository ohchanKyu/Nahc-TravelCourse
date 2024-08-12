import React from "react";
import classes from "./CafeSelect.module.css";
import { MdOutlineCategory } from "react-icons/md";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import FirstType from "./FirstType";
import SecondType from "./SecondType";
import ThirdType from "./ThirdType";

const CafeSelect = (props) => {

    const setCafeHandler = (cafe) => {
        props.onCafe(cafe);
    }

    const notSelectElement = (
        <React.Fragment>
            <div className={classes.not_select_container}>
                <h5><FaCheck style={{ marginBottom : '5px'}}/> 아직 선택하지 않았습니다!</h5>
                <p> 왼쪽 카테고리에서 종류를 선택해주세요. </p>
            </div>
        </React.Fragment>
    )

    
    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <div className={classes.container}>
            <h4><MdOutlineCategory/> 카페 설정 </h4>
            <motion.div key={props.type} variants={variants}
                animate='animate'
                initial='initial'
                exit='exit'
                className={classes.select_container}>
                {props.type && props.type === "카테고리 선택" && <FirstType onSelectCafe={setCafeHandler}/>}
                {props.type && props.type === "통합 검색" && <SecondType/>}
                {props.type && props.type === "직접 입력" && <ThirdType onSelectCafe={setCafeHandler}/>}
            </motion.div>
            {!props.type && notSelectElement}
        </div>
    );
};

export default CafeSelect;