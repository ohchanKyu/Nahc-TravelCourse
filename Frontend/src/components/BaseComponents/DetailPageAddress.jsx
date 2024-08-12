import React from "react";
import classes from "./DetailPageAddress.module.css";
import Address from "../MainPageComponents/Address";
import { GrMapLocation } from "react-icons/gr";
import { FaMapSigns } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaArrowCircleRight } from "react-icons/fa";

const DetailPageAddress = (props) => {
    
    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <div className={classes.address_container}>
            <h1 className={classes.address_header}>
                <FaLocationDot/> {props.header}
            </h1>
            <div className='row' style={{marginTop:'60px'}}>
                <div className={`col col-lg-6 ${classes.address_text_container}`}>
                    <p className={classes.address_sub_header}><GrMapLocation/> 주소입력 </p>
                    <p className={classes.address_text}>
                        주소 검색 버튼을 클릭 한 후 주소를 입력해주세요. <br/>
                        {props.text} 
                   </p>
                   {props.onCurrentSelect && (
                     <motion.p className={classes.current_menu}
                            variants={variants}
                            key={props.onCurrentSelect}
                            initial='initial'
                            animate='animate'
                            exit='exit'>
                            현재 선택 종류 <FaArrowCircleRight style={{ marginBottom : '5px'}}/> <span style={{ color: 'rgb(233 116 37)'}}>{props.onCurrentSelect}</span>
                    </motion.p>
                   )}
                  
                </div>
                <div className={`col col-lg-6 ${classes.address_list_container}`}>
                    <Address locationHandler={props.onPlaceLocation}/>
                </div>
                <h2 className={classes.result_header}><FaMapSigns/> 검색 결과 </h2>
            </div>
        </div>
    )
};

export default DetailPageAddress;