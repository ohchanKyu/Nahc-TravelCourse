import React from "react";
import classses from "./HotelSelect.module.css";
import { MdOutlineCategory } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const HotelSelect = (props) => {

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    const notSelectElement = (
        <React.Fragment>
            <div className={classses.not_select_container}>
                <h5><FaCheck/> 아직 선택하지 않았습니다!</h5>
                <p> 왼쪽 카테고리에서 숙박 종류를 선택해주세요. </p>
            </div>
        </React.Fragment>
    );

    return (
        <div className={classses.container}>
            <h4><MdOutlineCategory/> 현재 선택한 카테고리</h4>
            {props.title &&  (
                <React.Fragment>
                     <motion.div key={props.title} variants={variants} animate='animate' initial='initial' exit="exit">
                        <p className={classses.select_title}><FaCheck style={{ marginBottom : '5px'}}/> {props.title} 선택 완료!</p>
                        <img className={classses.select_image} src={props.image} alt={props.title}/>
                    </motion.div>
                    <p className={classses.message}>※ 변경을 원하시면 왼쪽에서 다시 선택해주세요.</p>
                </React.Fragment>
                )
            }
            {!props.title && notSelectElement}
        </div>
    );
};

export default HotelSelect;