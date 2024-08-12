import React from "react";
import classes from "./PlaySelect.module.css";
import { FaCheck } from "react-icons/fa";
import PlayFirstType from "./PlayFirstType";
import PlaySecondType from "./PlaySecondType";
import PlayThirdType from "./PlayThirdType";
import { motion } from "framer-motion";
import { MdOutlineCategory } from "react-icons/md";

const PlaySelect = (props) => {

    const setPlaceHandler = (place) => {
        props.onPlace(place);
    };

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <div className={classes.container}>
            <h4><MdOutlineCategory/> 놀거리 설정 </h4>
            {!props.type && 
                <div className={classes.not_select_container}>
                    <h5><FaCheck style={{ marginBottom : '5px'}}/> 아직 선택하지 않았습니다!</h5>
                    <p> 왼쪽 카테고리에서 종류를 선택해주세요. </p>
                </div>
            }
            <motion.div key={props.type} variants={variants}
                animate='animate'
                initial='initial'
                exit='exit'
                className={classes.select_container}>
                {props.type && props.type === "1" && <PlayFirstType onSelectPlace={setPlaceHandler}/>}
                {props.type && props.type === "2"  && <PlaySecondType onSelectPlace={setPlaceHandler}/>}
                {props.type && props.type === "3" && <PlayThirdType onSelectPlace={setPlaceHandler}/>}
            </motion.div>
        </div>
    );

};

export default PlaySelect;