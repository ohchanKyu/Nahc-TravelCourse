import React, { useState } from "react";
import classes from "./PlaceInformation.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { motion, AnimatePresence} from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { BiSolidNavigation } from "react-icons/bi";

const PlaceInformation = (props) => {

    const [weekdayDetail,setWeekdayDetail] = useState(false);

    const weekdayDetailHandler = () => {
        setWeekdayDetail(state => {
            return !state;
        });
    };

    const goKakaoPlace = () => {
         window.open(props.item.placeURL, '_blank'); // 새 창에서 링크 열기
    };

    let openInformation;

    if(typeof props.item.openNow === "undefined" || props.item.openNow === null || props.item.openNow === ""){
        openInformation = "아직 등록되지 않았습니다."
    }else if (props.item.openNow){
        openInformation = '영업 중'
    }else{
        openInformation = '영업 종료'
    }

    const variants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y: -30}
    }

    return (
        <div className={classes.container}>
            <img src={props.item.image} alt='place-detail' className={classes.place_image}/>
            <div className={classes.text_box}>
                <h4 className={classes.title}>{props.item.placeName}</h4>
                <div className={classes.review}>
                    <div className={classes.rating}>
                        <FaStar style={{ color : '#f7cf00', marginBottom:'3px' , marginRight : '8px'}}/> 
                        {props.item.reviews && props.item.reviews.totalRating}
                        {props.item.reviews && !props.item.reviews.totalRating && <span>NaN</span>}
                    </div>
                    <div className={classes.review_count}>
                        방문자 리뷰 {props.item.reviewTotalCount}
                    </div>
                </div>
                <p className={classes.address}><FaLocationDot style={{ marginBottom:'3px'}}/> {props.item.addressName}</p>
                <p className={classes.phone}>
                    {props.item.phoneNumber && (
                        <React.Fragment>
                            <FaPhoneAlt style={{ marginBottom:'3px'}}/> {props.item.phoneNumber} <span>지점번호</span>
                        </React.Fragment>
                        
                    )}
                    {!props.item.phoneNumber && (
                        <React.Fragment>
                            <FaPhoneAlt style={{ marginBottom:'3px'}}/> {props.item.phoneNumber} <span>등록된 번호가 없습니다.</span>
                        </React.Fragment>             
                    )}
                </p>
                {props.item.internationalPhoneNumber && 
                    <p className={classes.international_phone}><FaPhoneAlt style={{ marginBottom:'3px'}}/> {props.item.internationalPhoneNumber} <span>국제번호</span></p>}
                <p className={classes.openNow}><IoTimeSharp style={{ marginBottom:'5px'}}/> <span style={{ color: props.item.openNow ? "#0aba16" : 'red' }}>{openInformation} </span>
                    {openInformation !== "아직 등록되지 않았습니다." &&  (
                        <IoIosArrowDown 
                        style={{ cursor : 'pointer', marginBottom:'5px' }}
                        className={`${classes.rotate180} ${weekdayDetail ? classes.active : ''}`} onClick={weekdayDetailHandler}/>
                    )}
                </p>
                <AnimatePresence>
                    <motion.ul
                        className={classes.weekday_list}>
                        <AnimatePresence>
                            {weekdayDetail && props.item.weekDay && props.item.weekDay.map(item => {
                                return <motion.li 
                                        className={classes.date}
                                        variants={variants} animate='animate' initial='initial' exit='exit' 
                                        key={Math.random()}>{item}
                                        </motion.li>
                            })}
                        </AnimatePresence>
                    </motion.ul>
                </AnimatePresence>
                <div className={classes.wrapper}>
                    <motion.p whileHover={{ scale : 1.1 }} className={classes.kakao} 
                        onClick={goKakaoPlace}>Kakao Place <BiSolidNavigation/> 
                    </motion.p>
                </div>
            </div>
        </div>
        
    )
};

export default PlaceInformation;